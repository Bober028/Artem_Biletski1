import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dogs: [],
  loading: false,
  error: null,
};

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setDogs: (state, action) => {
      state.dogs = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setDogs, setLoading, setError } = dogsSlice.actions;
export default dogsSlice.reducer;
