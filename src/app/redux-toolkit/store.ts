import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSliceApi } from './features/authSlice';
import { userSliceApi } from './features/userSlices';
import { repoSliceApi } from './features/repoSlice';
import { folderSliceApi } from './features/folderSlice';
import { pathSliceApi } from './features/pathSlice';

const rootReducer = combineReducers({
  [authSliceApi.reducerPath]: authSliceApi.reducer,
  [userSliceApi.reducerPath]: userSliceApi.reducer,
  [repoSliceApi.reducerPath]: repoSliceApi.reducer,
  [folderSliceApi.reducerPath]: folderSliceApi.reducer,
  [pathSliceApi.reducerPath]: pathSliceApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authSliceApi.middleware)
      .concat(userSliceApi.middleware)
      .concat(repoSliceApi.middleware)
      .concat(folderSliceApi.middleware)
      .concat(pathSliceApi.middleware),
});
export default store;

const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { dispatch };
