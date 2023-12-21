import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { BiLogoPinterestAlt, BiLogoFacebook, BiLogoLinkedin, BiLogoTwitter, } from "react-icons/bi";
import { BsSuitHeartFill } from "react-icons/bs";



const Footer = memo(() => {
    return (
        <div className='text-white h-auto bg-sky-950 relative'>
            <div className=' child:mt-12 child:mr-5  max-w-[80%] mx-auto  flex justify-between flex-wrap'>

                <div>
                    <img className=' mb-5' src='../../media/logo/logo.png.webp' alt='logo' />
                    <span className=' sm:w-72 block text-slate-300'>Lorem iaspsum doldfor sit amvset, consectetur adipisicing cvelit csed do eiusmod tempor incididucvccnt ut labovre.</span>
                </div>
                <div className=''>
                    <h4 className='text-xl font-semibold mb-8 capitalize font-Barlow-Regular'>Quick Links</h4>
                    <nav>
                        <nav className=' block  child:block font-extralight text-slate-300 child:mb-6 '>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' >
                                <h3>ABOUT US</h3>
                            </NavLink>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true' >
                                <h3>PACKAGE</h3>
                            </NavLink>
                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true'>
                                <h3>BLOG</h3>
                            </NavLink>

                            <NavLink className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer' exact='true'>
                                <h3>CONTACT US</h3>
                            </NavLink>
                        </nav>
                    </nav>
                </div>
                <div className=' child:block'>
                    <h4 className=' text-xl font-semibold mb-8 capitalize font-Barlow-Regular'>New Foods</h4>
                    <ul className='child:font-extralight text-slate-300 child:mb-6 '>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>fish</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>kabab</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition ease-out duration-700 cursor-pointer'>pizza</li>
                    </ul>

                </div>
                <div className='child:block'>
                    <h4 className=' text-xl font-semibold mb-8 capitalize font-Barlow-Regular '>Support</h4>
                    <ul className='child:font-extralight text-slate-300 child:mb-6 '>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition hover:ease-out duration-700 cursor-pointer'>Frequently Asked Questions</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition hover:ease-out duration-700 cursor-pointer'>Terms & Conditions</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition hover:ease-out duration-700 cursor-pointer'>Privacy Policy</li>
                        <li className='hover:text-orange-500 hover:ml-2  hover:transition hover:ease-out duration-700 cursor-pointer'>Report a Payment Issue</li>
                    </ul>

                </div>
            </div>
            <div className=' text-sm flex flex-wrap justify-between max-w-[80%] m-auto pb-4 '>
                <h4>Copyright ©2023 All rights reserved | This web application is made with
                    <span className='mr-1 ml-1'><BsSuitHeartFill color='#fba902' style={{
                        display: 'inline',
                    }} /></span>  by
                    <img className=' inline ml-2 h-[1.8rem] mb-2' src='../../media/logo/signature.png' alt='rashin' />
                </h4>
                <div className='flex  items-center gap-4  child-hover:animate-spin cursor-pointer text-gray-50 align-middle  child-hover:text-[#fd7e14]'>
                    <div
                    >
                        <BiLogoTwitter />
                    </div>
                    <div
                    >
                        <BiLogoLinkedin />
                    </div>
                    <div
                    >
                        <BiLogoFacebook />
                    </div>
                    <div
                    >
                        <BiLogoPinterestAlt />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Footer;