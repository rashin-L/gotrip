import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const reservationAPI = createApi({

    reducerPath: 'reservationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    endpoints: (builder) => ({
        getReserv: builder.query({
            query: () => 'roomsAPI/reservation/',
            providesTags: 'reservData',
        }),

        reservation: builder.mutation({
            query: (data) => ({
                url: 'roomsAPI/reservation/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: data,

            }),
            invalidatesTags: ['RoomReserv'],
        }),

        updateReserv: builder.mutation({
            query: (data) => {
                console.log(data.id);
                console.log(data);

                return {
                    url: `roomsAPI/reservation/${data.id}/`,
                    method: 'PUT',
                    body: data,
                };
            },
            invalidatesTags: ['RoomReserv'],
        }),
        deleteReserv: builder.mutation({
            query: (id) => ({
                url: `roomsAPI/delete-reservation/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['RoomReserv'],
        })

    }),
});

export const { useReservationMutation, useGetReservQuery, useUpdateReservMutation, useDeleteReservMutation } = reservationAPI;