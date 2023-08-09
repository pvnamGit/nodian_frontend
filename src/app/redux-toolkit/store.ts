import { configureStore } from '@reduxjs/toolkit';
import { authSliceApi } from './features/authSlice';
import { userSliceApi } from './features/userSlices';

const store = configureStore({
  reducer: {
    [authSliceApi.reducerPath]: authSliceApi.reducer,
    [userSliceApi.reducerPath]: userSliceApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authSliceApi.middleware)
      .concat(userSliceApi.middleware),
});
export default store;

const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { dispatch };
