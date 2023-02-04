import { configureStore } from '@reduxjs/toolkit';
import chatBarSlice from './chatBarSlice';
import authSlice from './authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import chatBodySlice from './chatBodySlice';
import chatFooterSlice from './chatFooterSlice';

export const store = configureStore({
  reducer: {
    chatBarSlice: chatBarSlice.reducer,
    authSlice: authSlice.reducer,
    chatBodySlice: chatBodySlice.reducer,
    chatFooterSlice: chatFooterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
