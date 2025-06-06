import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import telegramReducer from "./telegramSlice"
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  session: sessionReducer,
  session:telegramReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // export persistor for <PersistGate />
export default store;
