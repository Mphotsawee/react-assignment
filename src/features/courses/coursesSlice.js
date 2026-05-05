import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
  },
  reducers: {
    addCourse: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
