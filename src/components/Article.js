import React from 'react';
// MdKeyboardDoubleArrowRight
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

function Article({ article }) {

    const dateObj = (dateString) => {
        const C_date = new Date(dateString);
        const year = C_date.getFullYear();
        const month = C_date.getMonth() + 1; // Adding 1 because months are zero-indexed
        const day = C_date.getDate();
        return [year, month, day]
    }


    return (
        <div className=' font-Barlow-Regular max-w-xl border border-y-zinc-200  h-60 mb-[19rem]'>
            <img className=' h-72 sm:h-80 md:h-96 '
                src={`https://gotrip-api.iran.liara.run${article.main_image}`} alt={article.title}>
            </img>
            <div className=' flex justify-between '>
                <div className='flex justify-center flex-col align-middle text-white text-lg w-32 
                max-w-xs   bg-sky-800 mt-8 text-center h-[5.5rem] shrink '>
                    <span className=' text-lg font-bold'>{dateObj(article.update_date)[2]}</span>
                    <span className=' text-lg font-bold'>{dateObj(article.update_date)[1]}</span>
                    <span className=' text-lg font-bold'>{dateObj(article.update_date)[0]}</span>

                </div>
                <div className=' relative h-52 sm:w-44 w-22  bg-white 
                top-[-3rem]  border-solid border-[1px] border-gray-200'>
                    <div className='  flex justify-center flex-col align-middle w-full h-full  px-2 sm:px-6'>
                        <h5 className=' text-lg text-slate-500 mb-4'>|{article?.group_title.group_title}</h5>
                        <h3 className=' font-bold mb-4  sm:text-2xl xs:text-xl'>{article.title}</h3>
                        <div className=' text-sm text-slate-500 flex align-middle cursor-pointer'>
                            READ MORE
                            <span className=' ml-1 mt-[0.2rem] '><MdKeyboardDoubleArrowRight /></span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Article;