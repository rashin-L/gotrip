import React from 'react';
import Article from '../../components/Article';
import { useGetArticleQuery } from '../../redux/services/blog/ArticleAPI';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Fade from 'react-reveal/Fade';

function Articles() {
    const { data: articles, isError, error, isLoading } = useGetArticleQuery();
    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }
    if (isError) {

        return <div>Error: {error.message}{console.log(error.status)}{console.log(articles)}</div>


    }

    return (
        <div className='bg-white relative'>
            <div className='font-Barlow-Regular mt-32 max-w-[80%] h-auto  m-auto pb-24'>
                <h4 className=' text-amber-400 text-center text-xl mb-2 pt-5'>OUR RECENT NEWS</h4>
                <h3 className=' text-center text-6xl mb-12 font-bold'>Tourist Blog</h3>

                <Fade bottom cascade>
                    <div className=' flex justify-between flex-wrap mb-75'>
                        {articles && articles.map((article) => (
                            <div key={article.id}>
                                {/* {article.title} */}
                                <Article article={article} />
                            </div>
                        ))}
                    </div>
                </Fade>


            </div>
        </div>
    );
}

export default Articles;