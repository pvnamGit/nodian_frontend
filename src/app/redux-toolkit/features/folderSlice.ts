import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SuccessfulResponse } from '@/app/types/types';

const FOLDER_REDUCER_PATH = 'folder';

export const folderSliceApi = createApi({
  reducerPath: FOLDER_REDUCER_PATH,
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
  tagTypes: ['Folder'],
  endpoints: builder => ({
    getFoldersInRepo: builder.query({
      query: repoId => ({
        url: '/folders',
        method: 'GET',
        params: { repoId },
      }),
      providesTags: ['Folder'],
    }),
    createNewFolder: builder.mutation<SuccessfulResponse, any>({
      query: (bodyRequest: any) => ({
        url: '/folder',
        method: 'POST',
        body: bodyRequest,
      }),
      invalidatesTags: ['Folder'],
    }),
    updateFolder: builder.mutation<any, any>({
      query: ({ folderId, bodyRequest }: { folderId: number; bodyRequest: any }) => ({
        url: `/folder/${folderId}`,
        method: 'PUT',
        body: bodyRequest,
      }),
      invalidatesTags: ['Folder'],
    }),
    deleteFolder: builder.mutation<any, any>({
      query: ({ folderId }: { folderId: number }) => ({
        url: `/folder/${folderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folder'],
    }),
  }),
});

export const { useGetFoldersInRepoQuery, useCreateNewFolderMutation, useUpdateFolderMutation, useDeleteFolderMutation } = folderSliceApi;
