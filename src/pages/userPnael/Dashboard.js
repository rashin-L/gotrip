import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdMarkEmailRead } from 'react-icons/md';
import { MdMobileFriendly } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutUserQuery } from '../../redux/services/auth/logoutAPI';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';
import { useGetCartQuery } from '../../redux/services/userPnael/userPnaelAPI';







function Dashboard() {
    const { user, LogoutUser } = useContext(UserContext);
    const { data: cart, isLoading, isError, error, refetch: Cartrefetch } = useGetCartQuery(user?.id);

    const navigate = useNavigate();
    // const { refetch } = useLogoutUserQuery();
    const logoutHandle = async () => {
        await LogoutUser();
        navigate('/');
        // localStorage.removeItem('user');
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

    }


    return (
        <div className='max-w-[80%] m-auto font-Barlow-Regular my-20'>
            <div className='flex flex-wrap justify-between gap-2'>
                <div className=' rounded-lg shadow-md p-6 mb-4 md:w-[20%] bg-sky-950  text-white text-lg'>
                    <ul className=' text-md child:p-2 '>
                        <li className='text-orange-400 text-xl font-bold'>
                            Dashboard
                        </li>
                        <li className='hover:text-orange-400'>
                            {cart && cart.User && (
                                <Link to={`/update_user/${user?.id}`} state={{ user: cart.User }}>Edit User Information</Link>
                            )}
                        </li>
                        <li className='hover:text-orange-400'>
                            {cart && cart.User && (
                                <Link to={`/change-password/${user?.id}`} state={{ user: cart.User }}>Change Password</Link>
                            )}
                        </li>
                        <li className='hover:text-orange-400'>
                            <Link to='/'>wallet</Link>
                        </li>
                        <li className='hover:text-orange-400'>
                            <Link to='/'>Factors</Link>
                        </li>
                        <li className='hover:text-orange-400'>
                            <Link onClick={logoutHandle}>Log Out</Link>
                        </li>
                    </ul>
                </div>

                <div className='bg-white text-lg rounded-lg shadow-md p-6 mb-4 md:w-[78%] sm:w-full '>
                    <h2 className=' text-xl mb-3 text-orange-400 font-bold'>User Information</h2>
                    <div className=' flex items-center justify-start align-middle gap-2 p-2'>
                        <FaUserCircle />{user?.name} {user?.family}
                    </div>
                    {cart && cart.User && (
                        <div className='flex items-center justify-start align-middle gap-2 p-2'>
                            <MdMarkEmailRead /> {cart.User.email}
                        </div>
                    )}
                    {cart && cart.User && (
                        <div className=' flex items-center justify-start align-middle gap-2 p-2'>
                            <MdMobileFriendly />{cart.User?.mobile_number}
                        </div>
                    )}
                    {cart && cart.User && (
                        <div className=' flex items-center justify-start align-middle gap-2 self-start p-2'>
                            <div className=' self-start mt-2'><FaAddressBook size={20} /></div>
                            {cart.User?.address}
                        </div>
                    )}
                    {cart && cart.User && (
                        <div className=' flex items-center justify-start align-middle gap-2 p-2'>
                            <FaCalendarCheck />{cart.User?.register_date}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Dashboard;