import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const LOGIN_REDUCER_PATH = 'loginByGoogle';

export const loginApi = createApi({
  reducerPath: LOGIN_REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {},
  }),
  endpoints: builder => ({
    loginByGoogle: builder.query({
      query: () => ({
        url: '/login/oauth/google',
        method: 'POST',
      }),
    }),
  }),
});
