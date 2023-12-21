import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const advertisingAPI = createApi({ 
    reducerPath: 'advertisingAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run/'}),
    endpoints: (builder) => ({
        getAdvertising: builder.query({
            query: ()=>'blogAPI/advertising',
            providesTags: ['advertising'],
        }),

    })
})
export const {useGetAdvertisingQuery,} = advertisingAPI;