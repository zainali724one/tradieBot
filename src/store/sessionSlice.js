// src/store/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: {},
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, clearUserId } = sessionSlice.actions;
export default sessionSlice.reducer;
