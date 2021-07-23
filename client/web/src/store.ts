import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import counterReducer from "./components/Counter/slice";
// import authReducer from "./components/App/slice";

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;