import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';
import { RxHamburgerMenu } from "react-icons/rx";


const BaseHeader = () => {
    const isMobile = window.innerWidth < 767.50;
    const [navbar, setNavbar] = useState(false);

    const navbarRef = useRef(null);

    useEffect(() => {
        let timeoutId;

        const handleMouseLeave = (event) => {
            if (!navbarRef.current.contains(event.relatedTarget)) {
                clearTimeout(timeoutId); // Clear the previous timeout if the mouse re-enters before the timeout expires
                timeoutId = setTimeout(() => {
                    setNavbar(false);
                }, 1000);
            }
        };

        const currentNavbarRef = navbarRef.current;

        if (currentNavbarRef) {
            currentNavbarRef.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (currentNavbarRef) {
                currentNavbarRef.removeEventListener("mouseleave", handleMouseLeave);
            }
            clearTimeout(timeoutId);
        };
    }, []);





    return (
        <div className=' font-Barlow-Regular text-sm h-20  w-full bg-white shadow-2xl  relative top-12 z-[90] '>
            <div className=' pt-2  text-black max-w-[80%] m-auto align-baseline  flex justify-between items-baseline'>
                <nav className="w-full ">
                    <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex ">
                        <div>
                            <div className="flex items-center justify-between py-3 md:py-5 md:block">
                                <Link to='/'>
                                    <img className='cursor-pointer' src='../../media/logo/logo.png.webp' alt='logo' />
                                </Link>
                                <div className="md:hidden">
                                    <button
                                        className="p-2 text-gray-700 rounded-md   border-none outline-none focus:border-gray-400 focus:border focus:outline-none hover:outline-none"
                                        onClick={() => setNavbar(!navbar)}
                                    >
                                        {navbar ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div ref={navbarRef}>
                            {isMobile
                                ? (<Reveal effect="fadeInUp" effectOut="fadeOutLeft" when={navbar}>
                                    <div

                                        className={`bg-white  flex-col text-[#264247]  p-4 rounded-sm justify-self-center pb-3 md:flex md:gap-6  md:flex-row  md:pb-0 md:mt-0 ${navbar ? "block opacity-100" : "hidden"
                                            }`}
                                    >
                                        <NavLink exact='true' to='/about-me'>
                                            <h3 className='  text-lg font-semibold hover:text-[#014b85]'>ABOUT Me</h3>
                                        </NavLink>
                                        <NavLink exact='true' to='/blog'>
                                            <h3 className='text-lg font-semibold hover:text-[#014b85]'>BLOG</h3>
                                        </NavLink>
                                        <li className="relative group list-none">
                                            <NavLink exact='true' className="text-lg font-semibold mb-[69px] " >
                                                <h3>PAGES</h3>
                                            </NavLink>
                                            <ul className=" pt-[1.5rem] z-[99] absolute  w-[8rem]   hidden space-y-4  group-hover:block child:list-none text-center  mb-4 bg-white
                    [&>*:first-child]:w-[8rem] [&>*:first-child]:pt-8 [&>*:first-child]:border-[#014b85] [&>*:first-child]:border-t-[5px] [&>*:last-child]:pb-8">
                                                <Reveal effect="fadeInUp" effectOut="fadeOutLeft">

                                                    <li><NavLink exact='true' to='/rooms'>
                                                        <h3 className='text-lg font-semibold hover:text-[#014b85]'>Rooms</h3>
                                                    </NavLink></li>
                                                    <li><NavLink exact='true' to='/foods'>
                                                        <h3 className='text-lg font-semibold hover:text-[#014b85]'>Foods</h3>
                                                    </NavLink></li>
                                                </Reveal>
                                            </ul>
                                        </li>
                                        <NavLink exact='true' to='/contact'>
                                            <h3 className='text-lg font-semibold hover:text-[#014b85]'>CONTACT US</h3>
                                        </NavLink>
                                    </div>
                                </Reveal>)
                                : (<div
                                    // ref={navbarRef}
                                    className={`bg-white  flex-col text-[#264247] sm:flex p-4 rounded-sm justify-self-center pb-3 md:flex md:gap-6  md:flex-row  md:pb-0 md:mt-0 ${navbar ? "block opacity-100" : "hidden"
                                        }`}
                                >
                                    <NavLink exact='true' to='/about-me'>
                                        <h3 className='  text-lg font-semibold hover:text-[#014b85]'>ABOUT ME</h3>
                                    </NavLink>
                                    <NavLink exact='true' to='/blog'>
                                        <h3 className='text-lg font-semibold hover:text-[#014b85]'>BLOG</h3>
                                    </NavLink>
                                    <li className="relative group list-none">
                                        <NavLink exact='true' className="text-lg font-semibold mb-[69px] " >
                                            <h3>PAGES</h3>
                                        </NavLink>
                                        <ul className=" pt-[1.5rem] z-[99] absolute  w-[8rem]   hidden space-y-4  group-hover:block child:list-none text-center  mb-4 bg-white
                [&>*:first-child]:w-[8rem] [&>*:first-child]:pt-8 [&>*:first-child]:border-[#014b85] [&>*:first-child]:border-t-[5px] [&>*:last-child]:pb-8">
                                            <Reveal effect="fadeInUp" effectOut="fadeOutLeft">

                                                <li><NavLink exact='true' to='/rooms'>
                                                    <h3 className='text-lg font-semibold hover:text-[#014b85]'>Rooms</h3>
                                                </NavLink></li>
                                                <li><NavLink exact='true' to='/foods'>
                                                    <h3 className='text-lg font-semibold hover:text-[#014b85]'>Foods</h3>
                                                </NavLink></li>
                                            </Reveal>
                                        </ul>
                                    </li>
                                    <NavLink exact='true' to='/contact'>
                                        <h3 className='text-lg font-semibold hover:text-[#014b85]'>CONTACT US</h3>
                                    </NavLink>
                                </div>
                                )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>


    );
};

export default BaseHeader;

