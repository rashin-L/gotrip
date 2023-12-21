import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (newUser) => {
                console.log(newUser); // Log the newUser parameter
                return {
                    url: 'api/token/',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: newUser
                };
            },
            invalidatesTag: ['users'],
        }),

    })
})
export const { useLoginUserMutation } = loginAPI;

