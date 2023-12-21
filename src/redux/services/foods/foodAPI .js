import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodAPI = createApi({
    reducerPath: 'foodAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    endpoints: (builder) => ({
        getFood: builder.query({
            query: () => 'foodsAPI/foods/',
            providesTags: ['foods'],
        }),
        getLikeFood: builder.query({
            query: () => 'foodsAPI/food-like/',
            providesTags: ['food_likes'],
        }),

        addFoodLike: builder.mutation({
            query: (newLike) => ({
                url: '/foodsAPI/food-like/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: newLike
            }),
            invalidatesTag: ['Likes'],
        }),
        deleteFoodLike: builder.mutation({
            query: (id) =>({
                url: `foodsAPI/delete-FoodLike/${id}`, 
                method: 'DELETE'
            }),
            invalidatesTag: ['Likes']           
        })

    })
})
// useAddListMutation, useDeleteListMutation
export const { useGetFoodQuery, useAddFoodLikeMutation, useGetLikeFoodQuery, useDeleteFoodLikeMutation } = foodAPI;

