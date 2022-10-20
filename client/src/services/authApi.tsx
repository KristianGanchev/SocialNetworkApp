import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://socialnetworkserver.azurewebsites.net/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
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
