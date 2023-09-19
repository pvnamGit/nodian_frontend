import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SuccessfulResponse } from '@/app/types/types';

const NOTE_REDUCER_PATH = 'note';

export const noteSliceApi = createApi({
  reducerPath: NOTE_REDUCER_PATH,
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
  tagTypes: ['Note'],
  endpoints: builder => ({
    getNotesInRepo: builder.query({
      query: repoId => ({
        url: '/notes',
        method: 'GET',
        params: { repoId },
      }),
      providesTags: ['Note'],
    }),
    getNoteById: builder.query({
      query: ({ noteId, repoId }: { noteId: number; repoId: number }) => ({
        url: `/note/${noteId}`,
        method: 'GET',
        params: { repoId },
      }),
      providesTags: ['Note'],
    }),
    createNewNote: builder.mutation<SuccessfulResponse, any>({
      query: (bodyRequest: any) => ({
        url: '/note',
        method: 'POST',
        body: bodyRequest,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation<any, any>({
      query: ({ noteId, scope, bodyRequest }: { noteId: number; scope: string; bodyRequest: any }) => ({
        url: `/note/${noteId}`,
        method: 'PUT',
        params: { scope },
        body: bodyRequest,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation<any, any>({
      query: ({ noteId }: { noteId: number }) => ({
        url: `/note/${noteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const { useGetNoteByIdQuery, useGetNotesInRepoQuery, useCreateNewNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = noteSliceApi;
