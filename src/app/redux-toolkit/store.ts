import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSliceApi } from './features/authSlice';
import { userSliceApi } from './features/userSlices';
import { repoSliceApi } from './features/repoSlice';

const rootReducer = combineReducers({
  [authSliceApi.reducerPath]: authSliceApi.reducer,
  [userSliceApi.reducerPath]: userSliceApi.reducer,
  [repoSliceApi.reducerPath]: repoSliceApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authSliceApi.middleware).concat(userSliceApi.middleware).concat(repoSliceApi.middleware),
});
export default store;

const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { dispatch };
