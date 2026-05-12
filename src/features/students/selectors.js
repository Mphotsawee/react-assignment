import { createSelector } from '@reduxjs/toolkit';
import { studentsApi } from './studentsApi';

const selectGetStudentsResult = studentsApi.endpoints.getStudents.select();

const selectStudentsData = createSelector(
  selectGetStudentsResult,
  (result) => result?.data ?? []
);

export const selectAverageGpa = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return '0.00';
    const totalGpa = students.reduce((sum, student) => sum + student.gpa, 0);
    return (totalGpa / students.length).toFixed(2);
  }
);

export const selectStudentCount = createSelector(
  selectStudentsData,
  (students) => students.length
);

export const selectMaxGPA = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return '0.00';
    return Math.max(...students.map((s) => s.gpa)).toFixed(2);
  }
);

export const selectMinGPA = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return '0.00';
    return Math.min(...students.map((s) => s.gpa)).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectStudentsData,
  (students) => students.filter((student) => student.gpa >= 3.5)
);
