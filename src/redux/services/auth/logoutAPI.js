import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const logoutAPI = createApi({
    reducerPath: 'logoutAPI',
    // baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    endpoints: (builder) => ({
        logoutUser: builder.query({
            query: ()=>'accounts/LogoutUserAPI/',
            providesTags: ['logout'],
        }),


    })
})
export const { useLogoutUserQuery } = logoutAPI;

