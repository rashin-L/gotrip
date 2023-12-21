import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userPnaelAPI = createApi({ 
    reducerPath: 'cartAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (userId) => `accounts/UserCartAPI/${userId}`,
            providesTags: ['cart'],
        }),


    })
})
// useAddListMutation, useDeleteListMutation
export const {useGetCartQuery,} = userPnaelAPI;

