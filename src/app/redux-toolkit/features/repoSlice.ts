import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ErrorResponse, SuccessfulResponse } from '@/app/types/types';

const REPO_REDUCER_PATH = 'repo';

export const repoSliceApi = createApi({
  reducerPath: REPO_REDUCER_PATH,
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
  tagTypes: ['Repo'],
  endpoints: builder => ({
    getReposByOwner: builder.query<SuccessfulResponse | ErrorResponse, void>({
      query: () => ({
        url: '/repos',
        method: 'GET',
      }),
      providesTags: ['Repo'],
    }),
    createNewRepo: builder.mutation<any, any>({
      query: (name: string) => ({
        url: '/repo',
        method: 'POST',
        body: name,
      }),
      invalidatesTags: ['Repo'],
    }),
    updateRepo: builder.mutation<any, any>({
      query: ({ id, newName }: { id: number; newName: string }) => ({
        url: `/repo/${id}`,
        method: 'PUT',
        body: newName,
      }),
      invalidatesTags: ['Repo'],
    }),
    deleteRepo: builder.mutation<any, any>({
      query: ({ id }: { id: number }) => ({
        url: `/repo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Repo'],
    }),
  }),
});

export const { useGetReposByOwnerQuery, useCreateNewRepoMutation, useUpdateRepoMutation, useDeleteRepoMutation } = repoSliceApi;
