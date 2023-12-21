import React, { useState, useContext } from 'react';
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Reveal from 'react-reveal/Reveal';
import { UserContext } from '../UserContext';
import { IoLogoWhatsapp } from "react-icons/io";




const TopHeader = () => {
    const { user, LogoutUser } = useContext(UserContext);
    const [isTwitterHovered, setIsTwitterHovered] = useState(false);
    const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
    const [isFacebookHovered, setIsFacebookHovered] = useState(false);
    const [isPinterestHovered, setIsPinterestHovered] = useState(false);
    const navigate = useNavigate();

    const handleTwitterHover = () => {
        setIsTwitterHovered(!isTwitterHovered);
    };

    const handleLinkedinHover = () => {
        setIsLinkedinHovered(!isLinkedinHovered);
    };

    const handleFacebookHover = () => {
        setIsFacebookHovered(!isFacebookHovered);
    };

    const handlePinterestHover = () => {
        setIsPinterestHovered(!isPinterestHovered);
    };

    const innerStyle = {
        animation: 'flip 2s ',
        transformStyle: 'preserve-3d',
        transition: 'transform 3s ease-in-out',
    };

    const logoutHandle = async () => {
        LogoutUser();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'You have logout successfully'
        })
        navigate('/');
    }

    return (
        <div id='header' className='w-full z-[99] fixed'>
            <div className="  bg-slate-900 ">
                <div className='max-w-[80%] m-auto h-14 flex justify-between align-middle items-center'>
                    <div className='flex font-Barlow-Regular text-sm child:cursor-pointer text-gray-50 align-middle items-center gap-7'>

                        {user && user
                            ? (<li className="relative group list-none">
                                <NavLink exact='true' className=" text-white " >
                                    {/* <h3>{user?.name} {user?.family}</h3> */}
                                    {user && <h3>{user?.name} {user?.family}</h3>}
                                    {/* <h3>{user}</h3> */}
                                </NavLink>
                                {/* <a  className="text-black hover:text-[#264247]">PAGES</a> */}
                                <ul className=" bg-slate-900 pt-[0.8rem] z-[99] absolute  w-[8rem]   hidden space-y-4  group-hover:block child:list-none text-center  mb-4 
                                [&>*:first-child]:w-[8rem] [&>*:first-child]:pt-8 [&>*:first-child]:border-[#c7cacf] [&>*:first-child]:border-t-[5px] [&>*:last-child]:pb-8">
                                    <Reveal effect="fadeInUp" effectOut="fadeOutLeft">
                                        <li className='hover:text-amber-400'><NavLink exact='true' to='/dashboard'>Dashboard</NavLink></li>
                                        {/* <li><NavLink exact='true' to={`/cart/${user?.id}`}>Cart</NavLink></li> */}
                                        <li className='hover:text-amber-400'><NavLink exact='true' to={`/cart`}>Cart</NavLink></li>
                                        <li className='hover:text-amber-400'><NavLink exact='true' to='/favorites'>Favorites</NavLink></li>
                                        <li className=' cursor-pointer hover:text-amber-400' onClick={logoutHandle}>Log Out</li>
                                    </Reveal>
                                </ul>
                            </li>)
                            : (<>
                                <Link to='./register'>Register</Link>
                                <Link to='./login'>Login</Link>
                            </>)

                        }


                    </div>

                    <div className='flex  items-center gap-4  child-hover:cursor-pointer text-gray-50 align-middle  child-hover:text-[#fd7e14]'>
                        <Link to={"https://t.me/Rashin_latifi"}>
                            <div
                                style={isTwitterHovered ? innerStyle : {}}
                                onMouseEnter={handleTwitterHover}
                            // onMouseLeave={handleTwitterHover}
                            >
                                <BiLogoTelegram />
                            </div>
                        </Link>

                        <Link to={"https://www.linkedin.com/in/resale-latify/"}>
                            <div
                                style={isLinkedinHovered ? innerStyle : {}}
                                onMouseEnter={handleLinkedinHover}
                            // onMouseLeave={handleLinkedinHover}
                            >
                                <BiLogoLinkedin />
                            </div>
                        </Link>


                        <Link to={"https://github.com/rashin-L"}>

                            <div
                                style={isFacebookHovered ? innerStyle : {}}
                                onMouseEnter={handleFacebookHover}
                            // onMouseLeave={handleFacebookHover}
                            >
                                <BiLogoGithub />
                            </div>
                        </Link>
                        
                        <Link to={"https://wa.me/09037525580"}>
                            <div
                                style={isPinterestHovered ? innerStyle : {}}
                                onMouseEnter={handlePinterestHover}
                            // onMouseLeave={handlePinterestHover}
                            >
                                <IoLogoWhatsapp />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default TopHeader;