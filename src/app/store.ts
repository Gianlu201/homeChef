import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../features/features';

export const store = configureStore({
  reducer: {
    globalState: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
