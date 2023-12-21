import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Gallery from '../pages/hotel/Gallery';
import Foods from '../pages/foods/Foods';
import Room from './Room';
import Articles from '../pages/blog/Articles';
import ScrollToTopButton from './ScrollToTopButton';


function Index({ data, isError, error, isLoading, user }) {
    const sliceData = data?.ser_data.slice(0, 3);


    return (
        <div>
            <Gallery />
            <Room
                data={sliceData}
                isError={isError}
                error={error}
                isLoading={isLoading}
                user={user}
            >
                <h4 className=' text-amber-400 text-center text-xl mb-2 pt-5'>MORE ORDERED</h4>
                <h3 className=' text-center text-6xl mb-12 font-bold'>Favorite Rooms</h3>
            </Room>
            <Foods user={user} />
            <Articles />
            <ScrollToTopButton/>
        </div>
    );
}
export default Index;