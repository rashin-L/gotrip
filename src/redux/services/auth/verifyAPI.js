import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const verifyAPI = createApi({ 
    reducerPath: 'verifyAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    endpoints: (builder) => ({
        verifyUser: builder.mutation({
            query: (loginUser)=>({
            url: 'accounts/VerifyAPI/',
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: loginUser,
            credentials: "include"
        }),
        invalidatesTag: ['users'],
    }),


    })
})
export const {useVerifyUserMutation} = verifyAPI;

