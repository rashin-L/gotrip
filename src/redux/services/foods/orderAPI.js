import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    endpoints: (builder) => ({
        getOrder: builder.query({
            query: () => `foodsAPI/get-orders/`,
            providesTags: 'reservData',
        }),

        addOrder: builder.mutation({
            query: (newOrder) => {
                console.log('newOrder:', newOrder); // Log the newOrder object
                return {
                    url: 'foodsAPI/get-orders/',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: newOrder,

                };
            },
            invalidatesTags: ['Order'],
        }),
        updateOrder: builder.mutation({
            query: (data ) => ({
                url: `foodsAPI/order/${data.id}/`,
                // url: `roomsAPI/Foodation/${id}/`,
                method: 'PUT',

                body: data,
            }),
            invalidatesTags: ['Order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `foodsAPI/delete-order/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        })

    })
})
export const { useAddOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation, useGetOrderQuery } = orderAPI;



