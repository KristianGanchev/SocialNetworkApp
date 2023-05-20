import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Token {
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7173/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<Token, { email: string; password: string }>({
      query: (body: { email: string; password: string }) => {
        return {
          url: "identity/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
