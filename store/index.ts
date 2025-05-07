import { configureStore } from '@reduxjs/toolkit';
import childReducer from './child/childSlice';

export const store = configureStore({
  reducer: {
    child: childReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
