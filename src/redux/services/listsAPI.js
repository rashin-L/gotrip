import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const listsAPI = createApi({ 
    reducerPath: 'listsAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    // baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    endpoints: (builder) => ({
        getLists: builder.query({
            query: ()=>'lists',
            providesTags: ['lists'],
        }),

    //     addList: builder.mutation({
    //         query: (newList) => ({
    //             url: 'lists',
    //             method: 'POST',
    //             body: newList
    //         }),
    //         invalidatesTag: ['Lists'],
    //     }),
    //     deleteList: builder.mutation({
    //         query: (listId) =>({
    //             url: `lists/${listId}`, 
    //             method: 'DELETE'
    //         }),
    //         invalidatesTag: ['Lists']           
    //     })
    })
})
// useAddListMutation, useDeleteListMutation
export const {useGetListsQuery,} = listsAPI;