import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from './studentsSlice';

// Primitive selectors — scalar values, no memoization needed
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

// Memoized derived selectors
export const selectAverageGpa = createSelector(
  selectAllStudents,
  (students) => {
    if (students.length === 0) return "0.00";
    const totalGpa = students.reduce((sum, student) => sum + student.gpa, 0);
    return (totalGpa / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectAllStudents,
  (students) => students.filter((student) => student.gpa >= 3.5)
);

export const selectGpaDistribution = createSelector(
  selectAllStudents,
  (students) =>
    students.reduce((acc, student) => {
      const bucket = Math.floor(student.gpa);
      const key = `${bucket}.0–${bucket}.9`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
);
