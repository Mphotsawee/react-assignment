import { useExpense } from "../context/ExpenseContext";

function BudgetBanner() {
  const {
    budget, setBudget,
    month, setMonth,
    totalExpense, balance,
    clearAll,
  } = useExpense();

  const fmt = (n) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 2 }).format(n);

  const usedPct =
    budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;
  const progressColor =
    usedPct >= 90 ? "var(--danger)" : usedPct >= 70 ? "var(--warning)" : "var(--success)";

  return (
    <div className="budget-banner">
      {/* Monthly Budget */}
      <div className="budget-stat">
        <h3>🎯 Monthly Budget</h3>
        <div className="amount positive">฿{fmt(budget)}</div>
      </div>

      {/* Spent this month */}
      <div className="budget-stat">
        <h3>💸 Spent</h3>
        <div className="amount expense">฿{fmt(totalExpense)}</div>
      </div>

      {/* Remaining */}
      <div className="budget-stat">
        <h3>💰 Remaining</h3>
        <div className={`amount ${balance >= 0 ? "positive" : "negative"}`}>
          {balance < 0 ? "−" : ""}฿{fmt(Math.abs(balance))}
        </div>
      </div>

      {/* Controls */}
      <div className="budget-set">
        <label htmlFor="month-input">📅 Month</label>
        <input
          id="month-input"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <label htmlFor="budget-input">Budget (฿)</label>
        <input
          id="budget-input"
          type="number"
          min="0"
          step="100"
          value={budget || ""}
          placeholder="0.00"
          onChange={(e) => setBudget(e.target.value)}
        />
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm("ลบรายการทั้งหมด?")) clearAll();
          }}
        >
          🗑️ Clear All
        </button>
      </div>

      {/* Progress bar */}
      {budget > 0 && (
        <div className="budget-progress">
          <div className="budget-progress-label">
            <span>Budget used</span>
            <strong style={{ color: progressColor }}>
              ฿{fmt(totalExpense)} / ฿{fmt(budget)} ({usedPct.toFixed(1)}%)
            </strong>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${usedPct}%`, backgroundColor: progressColor }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetBanner;
