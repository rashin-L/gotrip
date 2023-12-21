import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://gotrip-api.iran.liara.run' }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/accounts/RegisterUser/',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: newUser,
                credentials: "include"
            }),
            invalidatesTags: ['users'],
            
        }),
        updateUser: builder.mutation({
            query: (User ) => ({
                url: `accounts/UpdateUserAPI/${User.id}/`,
                method: 'PUT',   
                body: User,
            }),
            invalidatesTags: ['User'],
        }),
        ChangePassword: builder.mutation({
            query: (data ) => ({
                url: `accounts/change-password/${data.id}`,
                method: 'PUT',   
                body: data,
            }),
            invalidatesTags: ['password'],
        }),
        RememberPasswordAPI: builder.mutation({
            query: (mobile_number ) => ({
                url: `accounts/RememberPasswordAPI/`,
                method: 'POST', 
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },  
                body: mobile_number,
            }),
            invalidatesTags: ['password'],
        }),


    })
})
export const { useCreateUserMutation, useUpdateUserMutation, useChangePasswordMutation, useRememberPasswordAPIMutation } = registerAPI;

