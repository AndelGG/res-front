import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICapOut, IMaterials, IResOut, IResponse } from '../types.ts';

const baseUrl =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL_PRODUCTION
    : import.meta.env.VITE_API_URL_DEVELOPMENT;

export const shpackApi = createApi({
  reducerPath: 'shpackApi',
  baseQuery: fetchBaseQuery({ baseUrl }), // Базовый URL API
  endpoints: (builder) => ({
    // GET запрос для получения материалов
    getMaterials: builder.query<IMaterials[], boolean>({
      query: (capacity: boolean) => ({
        url: capacity ? 'capacitorMaterials' : 'resistorMaterials',
      }),
    }),

    // POST запрос для отправки данных
    getRes: builder.mutation<IResOut[], { body: IResponse }>({
      query: ({ body }) => ({
        url: 'arrOfRes',
        method: 'POST',
        body,
      }),
    }),
    getCap: builder.mutation<ICapOut[], { body: IResponse }>({
      query: ({ body }) => ({
        url: 'arrOfCaps',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetMaterialsQuery, useGetResMutation, useGetCapMutation } =
  shpackApi;
