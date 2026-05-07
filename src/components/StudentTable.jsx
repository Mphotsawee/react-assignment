import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllStudents } from '../features/students/selectors';
import { deleteStudent, updateStudent } from '../features/students/studentsSlice';
import EditModal from './EditModal';

function StudentTable() {
  const students = useSelector(selectAllStudents);
  const dispatch = useDispatch();
  const [editingStudent, setEditingStudent] = useState(null);

  if (students.length === 0) {
    return <p className="empty-state">No students yet. Add one above!</p>;
  }

  function handleSaveEdit(updatedStudent) {
    dispatch(updateStudent(updatedStudent));
    setEditingStudent(null);
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
            <tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.major}</td>
              <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
              <td className="actions-cell">
                <button 
                  className="btn-edit" 
                  onClick={() => setEditingStudent(student)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => dispatch(deleteStudent(student.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
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
