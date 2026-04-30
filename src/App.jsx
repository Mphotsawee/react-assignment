import { useState, useEffect } from "react";
import "./App.css";

import { ExpenseProvider } from "./context/ExpenseContext";
import BudgetBanner from "./components/BudgetBanner";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    document.title = "💰 Expense Tracker";
  }, []);

  return (
    <ExpenseProvider>
      <div className="app">
        <div className="section-header">
          <h1>💰 Personal Expense Tracker</h1>
          <p>Track your income and expenses with ease</p>
        </div>
        <div className="expense-app">
          <BudgetBanner />
          <div className="expense-layout">
            <ExpenseForm
              editItem={editItem}
              onCancelEdit={() => setEditItem(null)}
            />
            <ExpenseList onEdit={setEditItem} />
          </div>
          <ExpenseChart />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
