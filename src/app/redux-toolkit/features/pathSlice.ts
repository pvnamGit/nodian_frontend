import { url } from 'inspector';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SuccessfulResponse } from '@/app/types/types';
import { BASE_URL } from '@/app/services/common';

const PATH_REDUCER_PATH = 'path';

export const pathSliceApi = createApi({
  reducerPath: PATH_REDUCER_PATH,
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
  tagTypes: ['Path'],
  endpoints: builder => ({
    getPaths: builder.query({
      query: repoId => ({
        url: '/paths',
        method: 'GET',
        params: {
          repoId,
        },
      }),
      providesTags: ['Path'],
    }),
  }),
});

export const { useGetPathsQuery } = pathSliceApi;
