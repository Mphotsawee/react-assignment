import { useState } from 'react';
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from '../features/students/studentsApi';
import EditModal from './EditModal';

function StudentRow({ student, onEdit, onDelete }) {
  return (
    <tr className={student.gpa >= 3.5 ? 'high-gpa' : ''}>
      <td>{student._index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
      <td className="actions-cell">
        <button className="btn-edit" onClick={() => onEdit(student)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function StudentTable() {
  const { data: students = [], isLoading, isError, error, refetch } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [editingStudent, setEditingStudent] = useState(null);

  async function handleSaveEdit(updatedStudent) {
    await updateStudent(updatedStudent);
    setEditingStudent(null);
  }

  if (isLoading) {
    return (
      <div className="table-status">
        <div className="spinner"></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="table-status error">
        <p>Error: {error?.data?.message || error?.error || 'Failed to load students'}</p>
        <button className="btn-primary" onClick={refetch}>
          Retry
        </button>
      </div>
    );
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
              student={{ ...student, _index: index }}
              onEdit={setEditingStudent}
              onDelete={deleteStudent}
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
