import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const roomAPI = createApi({ 
    reducerPath: 'roomAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    endpoints: (builder) => ({
        getRoom: builder.query({
            query: ()=>'/roomsAPI/rooms/',
            providesTags: 'rooms',
        }),
        getRate: builder.query({
            query: ()=>'/roomsAPI/rooms/',
            providesTags: 'rooms',
        }),

        addRate: builder.mutation({
            query: (newRate) => ({
                url: '/roomsAPI/rooms/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: newRate
            }),
            invalidatesTag: ['Rates'],
        }),
        addLike: builder.mutation({
            query: (newLike) => ({
                url: '/roomsAPI/room-like/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: newLike
            }),
            invalidatesTag: ['Likes'],
        }),

        deleteRoomLike: builder.mutation({
            query: (roomLikeId) =>({
                url: `/roomsAPI/delete-roomLike/${roomLikeId}`, 
                method: 'DELETE'
            }),
            invalidatesTag: ['Likes']           
        })
    })
})
// useAddListMutation, useDeleteListMutation
export const {useGetRoomQuery, useAddRateMutation, useAddLikeMutation, useDeleteRoomLikeMutation, useGetRateQuery} = roomAPI;

