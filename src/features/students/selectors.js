export const selectAllStudents = (state) => state.students.list;

export const selectStudentCount = (state) => state.students.list.length;

export const selectAverageGpa = (state) => {
  const students = state.students.list;
  if (students.length === 0) return "0.00";
  const totalGpa = students.reduce((sum, student) => sum + student.gpa, 0);
  return (totalGpa / students.length).toFixed(2);
};

export const selectStudentById = (studentId) => (state) =>
  state.students.list.find((student) => student.id === studentId);

export const selectHighAchievers = (state) =>
  state.students.list.filter((student) => student.gpa >= 3.5);
