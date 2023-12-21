import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleAPI = createApi({ 
    reducerPath: 'ArticleAPI',
    baseQuery: fetchBaseQuery({baseUrl:'https://gotrip-api.iran.liara.run/'}),
    endpoints: (builder) => ({
        getArticle: builder.query({
            query: ()=>'blogAPI/article',
            providesTags: ['article'],
        }),

    })
})
export const {useGetArticleQuery,} = articleAPI;