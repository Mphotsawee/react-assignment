import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://69da9b2226585bd92dd400ca.mockapi.io/api/v1/students';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  'students/addStudentAsync',
  async (newStudent, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, newStudent);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add student');
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async (student, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${student.id}`, student);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteStudentAsync',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete student');
    }
  }
);
