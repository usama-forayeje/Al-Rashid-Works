import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workers: [],
  isLoading: false,
  isError: false,
  error: null,
};

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    getWorkers: (state, action) => {
      state.workers = action.payload;
    },
  },
});

export default workersSlice.reducer;

export const { getWorkers } = workersSlice.actions;
