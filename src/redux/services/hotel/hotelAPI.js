import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelAPI = createApi({ 
    reducerPath: 'galleryAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run'}),
    endpoints: (builder) => ({
        getGallery: builder.query({
            query: ()=>'gallery',
            providesTags: ['gallery'],
        }),
        addMessage: builder.mutation({
            query: (newMessage) => ({
                url: '/contact-us/',
                method: 'POST',
                // headers: {
                //     'Accept': 'application/json',
                //     "Content-Type": "application/x-www-form-urlencoded",
                // },
                body: newMessage
            }),
            invalidatesTag: ['message'],
        }),

    })
})
export const {useGetGalleryQuery, useAddMessageMutation} = hotelAPI;

