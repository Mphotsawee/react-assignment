import { useState, useMemo } from "react";
import { useExpense } from "../context/ExpenseContext";

function ExpenseList({ onEdit }) {
  const { monthlyExpenses, deleteExpense, exportCSV } = useExpense();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const filtered = useMemo(() => {
    let list = monthlyExpenses;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "date-asc":    return a.date.localeCompare(b.date);
        case "date-desc":   return b.date.localeCompare(a.date);
        case "amount-desc": return b.amount - a.amount;
        case "amount-asc":  return a.amount - b.amount;
        default:            return 0;
      }
    });
  }, [monthlyExpenses, search, sortBy]);

  const fmt = (n) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 2 }).format(n);

  return (
    <div className="expense-list-card">
      {/* Header */}
      <div className="list-header">
        <h2>📋 Expenses ({filtered.length})</h2>
        <div className="list-filters">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">📅 Newest</option>
            <option value="date-asc">📅 Oldest</option>
            <option value="amount-desc">↑ Highest</option>
            <option value="amount-asc">↓ Lowest</option>
          </select>
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-list">
          <div className="empty-list-icon">
            {monthlyExpenses.length === 0 ? "📭" : "🔍"}
          </div>
          {monthlyExpenses.length === 0
            ? "ยังไม่มีรายการในเดือนนี้"
            : "ไม่พบรายการที่ค้นหา"}
        </div>
      ) : (
        <div className="expense-items-list">
          {filtered.map((exp) => (
            <div key={exp.id} className="expense-item expense-item-type">
              <div className="expense-item-left">
                <span className="expense-item-desc">{exp.description}</span>
                <span className="expense-item-meta">
                  {exp.category} · {exp.date}
                </span>
              </div>
              <div className="expense-item-right">
                <span className="expense-amount expense">
                  −฿{fmt(exp.amount)}
                </span>
                <div className="item-actions">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => onEdit(exp)}
                    title="แก้ไข"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      if (window.confirm(`ลบ "${exp.description}"?`))
                        deleteExpense(exp.id);
                    }}
                    title="ลบ"
                    style={{ color: "var(--danger)" }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export */}
      {monthlyExpenses.length > 0 && (
        <div className="export-row">
          <button className="btn btn-outline btn-sm" onClick={exportCSV}>
            📥 Export CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
