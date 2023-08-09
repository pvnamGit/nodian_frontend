import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const USER_REDUCER_PATH = 'userSlice';

export const userSliceApi = createApi({
  reducerPath: USER_REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getCurrentUserInfo: builder.query({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCurrentUserInfoQuery } = userSliceApi;
