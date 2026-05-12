import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllStudents, selectStudentById } from '../features/students/studentsSlice';
import { selectStudentsStatus, selectStudentsError } from '../features/students/selectors';
import { deleteStudentAsync, updateStudentAsync, fetchStudents } from '../features/students/studentsThunks';
import EditModal from './EditModal';

function StudentRow({ id, index, onEdit }) {
  const student = useSelector((state) => selectStudentById(state, id));
  const dispatch = useDispatch();

  if (!student) return null;

  return (
    <tr className={student.gpa >= 3.5 ? "high-gpa" : ""}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
      <td className="actions-cell">
        <button className="btn-edit" onClick={() => onEdit(student)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => dispatch(deleteStudentAsync(student.id))}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function StudentTable() {
  const students = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);
  const dispatch = useDispatch();
  const [editingStudent, setEditingStudent] = useState(null);

  function handleSaveEdit(updatedStudent) {
    dispatch(updateStudentAsync(updatedStudent));
    setEditingStudent(null);
  }

  if (status === 'loading') {
    return (
      <div className="table-status">
        <div className="spinner"></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="table-status error">
        <p>Error: {error}</p>
        <button className="btn-primary" onClick={() => dispatch(fetchStudents())}>
          Retry
        </button>
      </div>
    );
  }

  if (status !== 'succeeded') {
    return null;
  }

  if (students.length === 0) {
    return <p className="empty-state">No students yet. Add one above!</p>;
  }

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRow
              key={student.id}
              id={student.id}
              index={index}
              onEdit={setEditingStudent}
            />
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <EditModal
          student={editingStudent}
          onSave={handleSaveEdit}
          onCancel={() => setEditingStudent(null)}
        />
      )}
    </>
  );
}

export default StudentTable;
