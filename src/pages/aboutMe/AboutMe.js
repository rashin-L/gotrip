import React from 'react';
import Reveal from 'react-reveal/Reveal';
import Pulse from 'react-reveal/Pulse';
import { Link } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';


function AboutMe() {
    return (
        <div className='  max-w-[80%] m-auto'>

            <div className=' flex justify-between items-start mt-32 flex-wrap font-Barlow-Regular'>
                <Reveal effect="fadeInUp">
                    <img className='   w-full max-w-lg h-[5rem]  xs:h-[8rem] ' src='/media/images/logo.png' alt='laptop' />
                </Reveal>
                <div className='w-full lg:w-[27rem] my-8'>
                    <Pulse>
                        <h2 className='text-2xl xs:text-3xl text-[#264247] font-bold mb-4'>Professional Summary</h2>
                    </Pulse>
                    <Bounce left>
                        <hr className=' w-auto h-1 bg-[#264247]' />
                    </Bounce>
                    <p className=' text-[#264247] font-bold text-lg text-justify'>As a teenager, I fell in love with computers and programming. Despite studying geology at university, I spent most of my free time in the computer room trying to learn programming. It wasn't until 10 years later, when I enrolled in professional programming training at Dresman Academy, that I was finally able to follow my dream and upload my first website
                        <Link className=' cursor-pointer text-blue-700' to='https://www.momtaz-academy.ir/'>(Momtaz Academy) </Link>

                        by myself with love and passion. Now, I am thrilled to continue doing what I love professionally by creating my personal website. In everything I do, I believe in going one level deeper, seeing the patterns, potential, and purpose that drive my clients to thrive. I am passionate about delivering high-quality work that exceeds my clients' expectations and takes pride in ensuring their satisfaction. Programming for me is like classical music - its challenges and difficulties excite me, and I enjoy every bit of it. As I continue to learn and progress in this field, I am grateful for the path that led me here and for the opportunity to pursue my passion.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;