import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  masters: [],
  isLoading: false,
  isError: false,
  error: null,
};

const mastersSlice = createSlice({
  name: "masters",
  initialState,
  reducers: {
    getMasters: (state, action) => {
      state.masters = action.payload;
    },
  },
});

export const { getMasters } = mastersSlice.actions;

export default mastersSlice.reducer;
