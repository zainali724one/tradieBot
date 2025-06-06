// src/store/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  telegramId: {},
};

const telegramSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setTelegramId: (state, action) => {
      state.userId = action.payload;
    },
    clearTelegramId: (state) => {
      state.userId = null;
    },
  },
});

export const { setTelegramId, clearTelegramId } = telegramSlice.actions;
export default telegramSlice.reducer;
