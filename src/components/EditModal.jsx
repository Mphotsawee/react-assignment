import { useState } from 'react';

function EditModal({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...student });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'gpa' ? parseFloat(value) || 0 : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Student Info</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Student ID
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Major
            <input
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            GPA
            <input
              name="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={formData.gpa}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
