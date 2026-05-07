import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudentAsync } from '../features/students/studentsThunks';

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '' };

function AddStudentForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.studentId.trim()) {
      setError('Name and Student ID are required.');
      return;
    }

    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError('GPA must be a number between 0.0 and 4.0.');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(addStudentAsync({
        name: formData.name.trim(),
        studentId: formData.studentId.trim(),
        major: formData.major.trim() || 'Undeclared',
        gpa: gpaNum,
      })).unwrap();
      
      setFormData(EMPTY_FORM);
      setError('');
    } catch (err) {
      setError(err || 'Failed to add student');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <input
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="studentId"
          placeholder="Student ID *"
          value={formData.studentId}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="major"
          placeholder="Major"
          value={formData.major}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <input
          name="gpa"
          placeholder="GPA (0.0–4.0)"
          value={formData.gpa}
          onChange={handleChange}
          type="number"
          step="0.01"
          min="0"
          max="4"
          disabled={isSubmitting}
        />
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : '+ Add Student'}
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
