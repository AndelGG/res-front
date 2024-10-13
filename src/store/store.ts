// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { toggleReducer } from './toggleSlice';
import { shpackApi } from './api.ts';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    [shpackApi.reducerPath]: shpackApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(shpackApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
