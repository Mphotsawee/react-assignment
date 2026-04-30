import { createContext, useContext, useReducer, useEffect } from "react";

/* ────────────────────────────────────────────────
   1.  Initial State
────────────────────────────────────────────────── */
const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses") || "[]"),
  budget: Number(localStorage.getItem("budget") || 0),
  month: localStorage.getItem("month") || new Date().toISOString().slice(0, 7),
};

/* ────────────────────────────────────────────────
   2.  Reducer – จัดการทุก action
────────────────────────────────────────────────── */
function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };

    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      };

    case "SET_BUDGET":
      return { ...state, budget: action.payload };

    case "SET_MONTH":
      return { ...state, month: action.payload };

    case "CLEAR_ALL":
      return { ...state, expenses: [] };

    default:
      return state;
  }
}

/* ────────────────────────────────────────────────
   3.  Context
────────────────────────────────────────────────── */
const ExpenseContext = createContext(null);

/* ────────────────────────────────────────────────
   4.  Provider
────────────────────────────────────────────────── */
export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // บันทึกลง localStorage ทุกครั้งที่ state เปลี่ยน
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem("budget", String(state.budget));
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem("month", state.month);
  }, [state.month]);

  /* ── Derived values — กรองเฉพาะเดือนที่เลือก ── */
  const monthlyExpenses = state.expenses.filter((e) =>
    e.date.startsWith(state.month)
  );

  const totalExpense = monthlyExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const balance = state.budget - totalExpense;

  /* ── Action helpers ── */
  const addExpense = (expense) =>
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        ...expense,
        id: Date.now(),
        date: expense.date || new Date().toISOString().slice(0, 10),
      },
    });

  const deleteExpense = (id) => dispatch({ type: "DELETE_EXPENSE", payload: id });

  const editExpense = (expense) =>
    dispatch({ type: "EDIT_EXPENSE", payload: expense });

  const setBudget = (amount) =>
    dispatch({ type: "SET_BUDGET", payload: Number(amount) });

  const setMonth = (month) =>
    dispatch({ type: "SET_MONTH", payload: month });

  const clearAll = () => dispatch({ type: "CLEAR_ALL" });

  /* ── Export to CSV ── */
  const exportCSV = () => {
    const header = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = state.expenses.map((e) => [
      e.date,
      `"${e.description}"`,
      e.category,
      e.type,
      e.amount,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        monthlyExpenses,
        budget: state.budget,
        month: state.month,
        totalExpense,
        balance,
        addExpense,
        deleteExpense,
        editExpense,
        setBudget,
        setMonth,
        clearAll,
        exportCSV,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

/* ────────────────────────────────────────────────
   5.  Custom Hook – useExpense
────────────────────────────────────────────────── */
export function useExpense() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpense must be used inside <ExpenseProvider>");
  return ctx;
}

export default ExpenseContext;
