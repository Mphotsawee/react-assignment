import { useState, useRef, useEffect } from "react";
import { useExpense } from "../context/ExpenseContext";

const CATEGORIES = [
  "Food & Drink", "Transport", "Shopping", "Entertainment",
  "Health", "Housing", "Education", "Other",
];

const EMPTY_FORM = {
  description: "",
  amount: "",
  category: "Food & Drink",
  date: new Date().toISOString().slice(0, 10),
};

function ExpenseForm({ editItem, onCancelEdit }) {
  const { addExpense, editExpense } = useExpense();
  const descRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editItem) {
      setForm({
        description: editItem.description,
        amount:      editItem.amount,
        category:    editItem.category,
        date:        editItem.date,
      });
      setTimeout(() => descRef.current?.focus(), 50);
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editItem]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim() || !form.amount || Number(form.amount) <= 0) return;

    if (editItem) {
      editExpense({ ...editItem, ...form, amount: Number(form.amount) });
      onCancelEdit();
    } else {
      addExpense({ ...form, amount: Number(form.amount) });
    }
    setForm(EMPTY_FORM);
    descRef.current?.focus();
  };

  const isEditing = Boolean(editItem);

  return (
    <div className="expense-form-card">
      <h2>{isEditing ? "✏️ Edit Expense" : "➕ Add Expense"}</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            ref={descRef}
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Lunch, Rent, Coffee..."
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount (฿)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className={`btn btn-full ${isEditing ? "btn-warning" : "btn-primary"}`}
          >
            {isEditing ? "💾 Save Changes" : "➕ Add Expense"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
