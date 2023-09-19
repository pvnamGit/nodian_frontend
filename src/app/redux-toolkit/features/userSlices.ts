import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorResponse, SuccessfulResponse } from '@/app/types/types';

const USER_REDUCER_PATH = 'userSlice';

export const userSliceApi = createApi({
  reducerPath: USER_REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getCurrentUserInfo: builder.query<SuccessfulResponse | ErrorResponse, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCurrentUserInfoQuery } = userSliceApi;
