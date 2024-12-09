import { configureStore } from '@reduxjs/toolkit';
import dogsReducer from './dogSlice';

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
  },
});