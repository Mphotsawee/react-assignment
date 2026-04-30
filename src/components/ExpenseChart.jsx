import { useMemo } from "react";
import { useExpense } from "../context/ExpenseContext";

/**
 * ExpenseChart Component
 * Bar Chart แสดงยอดรายจ่ายแต่ละหมวดหมู่
 */
function ExpenseChart() {
  const { monthlyExpenses } = useExpense();

  const chartData = useMemo(() => {
    const map = {};
    monthlyExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8); // แสดงสูงสุด 8 หมวด
  }, [monthlyExpenses]);

  const max = chartData.length > 0 ? chartData[0][1] : 1;

  const fmt = (n) =>
    new Intl.NumberFormat("th-TH", { minimumFractionDigits: 0 }).format(n);

  // ไล่สี bar ตามลำดับ
  const COLORS = [
    "#2563eb", "#7c3aed", "#db2777", "#dc2626",
    "#d97706", "#16a34a", "#0891b2", "#64748b",
  ];

  if (chartData.length === 0) {
    return (
      <div className="chart-card">
        <h2>📊 Spending by Category</h2>
        <div className="empty-list">No expense data to display yet.</div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2>📊 Spending by Category</h2>
      <div className="bar-chart">
        {chartData.map(([cat, amount], i) => (
          <div className="bar-row" key={cat}>
            <div className="bar-label" title={cat}>{cat}</div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(amount / max) * 100}%`,
                  background: COLORS[i % COLORS.length],
                }}
              />
            </div>
            <div className="bar-value">฿{fmt(amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseChart;
