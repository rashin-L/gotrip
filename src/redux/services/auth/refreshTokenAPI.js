import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const refreshAPI = createApi({
    reducerPath: 'refreshAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run ' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    endpoints: (builder) => ({
        refreshUser: builder.mutation({
            query: (authToken) => {
                console.log(authToken); // Log the newUser parameter
                return {
                    url: 'api/token/refresh/',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: authToken
                };
            },
            invalidatesTag: ['authToken'],
        }),

    })
})
export const { useRefreshUserMutation } = refreshAPI;

