import React from 'react';
// import {useGetgalleryQuery} from '../../redux/servises/galleryApi';  
import { useGetGalleryQuery } from '../../redux/services/hotel/hotelAPI';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Gallery = () => {
    const { data: gallery, isError, error, isLoading } = useGetGalleryQuery();
    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );


    }
    if (isError) {

        return <div>Error: {error.message}{console.log(error.status)}{console.log(gallery)}</div>


    }
    return (
        <div className=' bg-transparent  overflow-hidden h-[70vh] w-fit  z-0 relative top-[-1.5rem]'>

            <Carousel showArrows={false} showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true}
                stopOnHover={false}
                animationHandler="fade" >
                {gallery.map((image) => (
                    <div key={image.id} >
                        <img className=' h-[70vh] fixed w-full' src={`https://gotrip-api.iran.liara.run/${image.image}`} alt="img" />
                        {/* <p className="legend">Image 1</p> */}
                    </div>
                ))}

            </Carousel>
        </div>
    )
};



export default Gallery;