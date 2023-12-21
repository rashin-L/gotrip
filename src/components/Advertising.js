import React, { useState, useEffect } from 'react';
import { useGetAdvertisingQuery } from '../redux/services/blog/AdvertisingAPI';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Fade from 'react-reveal/Fade';
import { RiCloseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Advertising() {
    const { data: ads, isError, error, isLoading } = useGetAdvertisingQuery();
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [show, setShow] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            if (ads && ads.length <= currentAdIndex) {
                setCurrentAdIndex(0);
            } else {
                setCurrentAdIndex((prevIndex) => prevIndex + 1);
            }
        }, 3000)
    }, [ads, currentAdIndex])


    const handlePopupClose = () => {
        setShow(false);
    };


    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }
    if (isError) {
        return <div>Error: {error.message}{console.log(error.status)}{console.log(ads)}</div>
    }

    return (
        <div dir='rtl' className='font-Barlow-Regular  max-w-[80%] h-auto  mb-24 fixed z-[99]'>
            {ads && ads.length > 0 && ads.map((ad, index) => (
                <div key={ad.id}>
                    {index === currentAdIndex && show && (
                        <>
                            <Fade>
                                <Link to={ad.link}>
                                <div  className='relative right-0 top-[-2.5rem]'>
                                    <div className=' top-4 left-0 relative cursor-pointer'>
                                        <RiCloseFill onClick={handlePopupClose} />

                                    </div>
                                    {/* <img className='h-96 cursor-pointer' src={`http://127.0.0.1:8000${ad.main_image}`} alt={ad.title} /> */}
                                    <img className='h-96 cursor-pointer' src={`https://gotrip-api.iran.liara.run${ad.main_image}`} alt={ad.title} />
                                </div>
                                </Link>
                            </Fade>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Advertising;