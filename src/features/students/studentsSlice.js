import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from './studentsThunks';

const studentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const studentsSlice = createSlice({
  name: 'students',
  initialState: studentsAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        studentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Add Student
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.addOne(state, action.payload);
      })
      // Update Student
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.upsertOne(state, action.payload);
      })
      // Delete Student
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors((state) => state.students);

export default studentsSlice.reducer;
