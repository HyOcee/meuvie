import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies-slice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
