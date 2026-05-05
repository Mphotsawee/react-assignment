import { createSlice } from '@reduxjs/toolkit';

const gradesSlice = createSlice({
  name: 'grades',
  initialState: {
    list: [],
  },
  reducers: {
    addGrade: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addGrade } = gradesSlice.actions;
export default gradesSlice.reducer;
