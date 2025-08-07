// // src/store/sessionSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userId: {},
// };

// const sessionSlice = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//     },
//     clearUserId: (state) => {
//       state.userId = null;
//     },
//   },
// });

// export const { setUserId, clearUserId } = sessionSlice.actions;
// export default sessionSlice.reducer;

// src/store/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: {},
  addquot: {
    customerName: "",
    jobDescription: "",
    quoteAmount: "",
    customerEmail: "",
    stripeAccountId: "",
  },
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
    setAddQuote: (state, action) => {
      state.addquot = action.payload;
    },
    clearAddQuote: (state) => {
      state.addquot = initialState.addquot;
    },
  },
});

export const { setUserId, clearUserId, setAddQuote, clearAddQuote } = sessionSlice.actions;
export default sessionSlice.reducer;
