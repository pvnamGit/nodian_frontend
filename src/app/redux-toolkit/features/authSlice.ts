import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { headers } from 'next/dist/client/components/headers';

const AUTH_REDUCER_PATH = 'auth';

export const authSliceApi = createApi({
  reducerPath: AUTH_REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  endpoints: builder => ({
    loginByGoogle: builder.mutation({
      query: (idToken: string) => ({
        url: '/login/oauth/google',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          idToken,
        },
      }),
    }),
  }),
});

export const { useLoginByGoogleMutation } = authSliceApi;
