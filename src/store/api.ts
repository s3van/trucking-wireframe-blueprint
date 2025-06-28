import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReactNode } from 'react';

export interface Quote {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  businessType: string;
  servicesNeeded: string[];
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRequest {
  name: string;
  phoneNumber: string;
  email: string;
  businessType: string;
  servicesNeeded: string[];
  comment: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface QuoteSubmissionResponse {
  orderNumber: string;
  message: string;
}

export interface QuotesPageRequest {
  page: number;
  size: number;
}

export interface QuoteListResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: Quote[];
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
    adminLogin: builder.mutation<string, LoginRequest>({
      query: (credentials) => ({
        url: '/admin/signin',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    submitQuote: builder.mutation<QuoteSubmissionResponse, QuoteRequest>({
      query: (quoteData) => ({
        url: '/client',
        method: 'POST',
        body: quoteData,
      }),
      invalidatesTags: ['Quote'],
    }),
    getQuotes: builder.query<QuoteListResponse, QuotesPageRequest>({
      query: ({ page, size }) => `/admin/quotes?page=${page}&size=${size}`,
      providesTags: ['Quote'],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useSubmitQuoteMutation,
  useGetQuotesQuery,
} = api;
