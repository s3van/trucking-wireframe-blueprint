
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Quote {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  services: string[];
  comments: string;
  orderNumber: string;
  submittedAt: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  services: string[];
  comments: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message?: string;
}

export interface QuoteSubmissionResponse {
  orderNumber: string;
  message: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://carrier-api-s6c9.onrender.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Quote', 'Auth'],
  endpoints: (builder) => ({
    adminLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/admin/signin',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    submitQuote: builder.mutation<QuoteSubmissionResponse, QuoteRequest>({
      query: (quoteData) => ({
        url: '/quotes',
        method: 'POST',
        body: {
          ...quoteData,
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          submittedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ['Quote'],
    }),
    getQuotes: builder.query<Quote[], void>({
      query: () => '/quotes',
      providesTags: ['Quote'],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useSubmitQuoteMutation,
  useGetQuotesQuery,
} = api;
