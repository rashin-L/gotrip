
import React, { useState, useContext } from 'react';
import { useAddLikeMutation } from '../redux/services/rooms/roomAPI'
import { useAddRateMutation, useGetRoomQuery } from '../redux/services/rooms/roomAPI';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import queryString from 'query-string';
import Swal from 'sweetalert2';
import Heart from "react-animated-heart";
import { useDeleteRoomLikeMutation } from '../redux/services/rooms/roomAPI';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from "@material-tailwind/react";
import { UserContext } from '../UserContext';
import Fade from 'react-reveal/Fade';







const Room = ({ recordsbool, records, data, children }) => {
    const { user } = useContext(UserContext)
    // const { data: rooms, isError, error, isLoading } = useGetRoomQuery();
    const [addRate, { error: rateError, isError: rateIsError }] = useAddRateMutation()
    // const { refetch: Raterefetch } = useGetRateQuery();
    const [deleteRoomLike] = useDeleteRoomLikeMutation()
    const [addLike, { error: likeError, isError: likeIsError }] = useAddLikeMutation()
    const { data: rooms, refetch, isError, error, isLoading, refetch: refetchReserv } = useGetRoomQuery();
    // const [reservation,] = useReservationMutation();
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setisHovered] = useState(false);
    const room_likes = rooms?.ser_room_likes;
    const room_rate = rooms?.ser_room_rating;
    

    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );

    }
    if (isError) {
        return (
            <div>
                Error: {error.message}
                {console.log(error.status)}

            </div>
        );
    }

    const RoomRateAverage = (room_id) => {
        let sum = 0;
        let count = 0;

        room_rate?.forEach((like) => {
            if (like.room === room_id) {
                sum += like.score;
                count++;
            }
        });

        const average = count > 0 ? sum / count : 0;
        return average.toFixed(1);
    }
    const handleRating = async (newValue, room_id) => {

        if (rateIsError) {
            console.log(rateError.data);
            Swal.fire({
                icon: 'error',
                // title: 'Yes...',
                text: rateError.data,
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            const response = addRate(
                queryString.stringify({
                    score: newValue,
                    room: room_id,
                    user_liked: user?.id,
                })
            );
            response.then(response => {
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        // title: 'Yes...',
                        text: response.data.message,
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })
                    refetchReserv()
                } else {
                    Swal.fire({
                        icon: 'warning',
                        // title: 'Yes...',
                        text: response.error.data.message,
                    })
                }
            });

        }
    };
    const handleLike = async (room_id) => {
        if (likeIsError) {
            console.log(likeError.data);
            Swal.fire({
                icon: 'error',
                text: likeError.data,
            });
        } else {
            const like = room_likes?.find(like => like?.user_liked === user?.id && like?.room === room_id);
            if (like) {
                await deleteRoomLike(like.id);
                const roomDiv = document.getElementById(`room_${room_id}`);
                console.log(roomDiv)
                roomDiv.style.transition = 'opacity 0.8s';
                roomDiv.style.opacity = 0;

                await refetch()
                // await setIsLoaded(false);

            }
            else {
                const response = addLike(queryString.stringify({
                    room: parseInt(room_id),
                    user_liked: user?.id,
                }));

                setIsLiked(!isLiked);
                response.then(async (response) => {
                    if (response.data) {
                        Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                            width: 400,
                        });
                        await refetch()
                        // await setIsLoaded(false);

                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: response.error.data.message,
                        });

                    }
                });
            }

        }
    };



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {recordsbool
                ? (
                    <div className='pb-5 font-Barlow-Regular bg-white relative '>
                        <div >
                            {/* Render children prop */}
                            {children}
                        </div>
                        <div className='max-w-[80%] h-auto m-auto flex flex-wrap justify-between align-middle items-center'>
                            {records && records?.map((room) => (
                                <Fade bottom >
                                    <div key={room?.id} id={`room_${room?.id}`} className="hover:bg-slate-200  m-auto w-[-webkit-fill-available] xs:w-[25rem] mt-2 mb-4  bg-white  border-solid border-2 border-neutral-200 rounded-lg dark:bg-gray-800">

                                        <Link to="#">
                                            <img className="relative top-[-1px] md:w-[24rem] mb-1 h-[20.5rem] rounded-md" src={`https://gotrip-api.iran.liara.run/${room.main_img}`} alt="product" />
                                        </Link>

                                        <div className='flex justify-between'>
                                            <div className=" w-[9rem] sm:w-auto flex md:px-5 items-center mt-2.5 mb-5">
                                                {user && (
                                                    <Stack spacing={1}>
                                                        {room_rate?.filter((like) => like.user_liked === user?.id && like.room === room.id)
                                                            .map((like) => (
                                                                <Rating
                                                                    key={like.id}
                                                                    value={like.score}
                                                                    onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                                    name="half-rating"
                                                                    defaultValue={2.5}
                                                                    disabled='true'
                                                                // precision={0.5}
                                                                />
                                                            ))}
                                                        {room_rate?.filter((like) => like.user_liked === user?.id && like.room === room.id)
                                                            .length === 0 && (
                                                                <Rating
                                                                    value={0}
                                                                    onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                                    name="half-rating"
                                                                    defaultValue={2.5}
                                                                />
                                                            )}
                                                    </Stack>
                                                )}
                                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{RoomRateAverage(room.id)}</span>
                                                {/* {isLiked ? 'text-red-500' : 'text-gray-500'} */}
                                            </div>
                                            {user && room_likes &&
                                                <div className="App">
                                                    <Heart isClick={room_likes?.some(like => like?.user_liked === user?.id && like?.room === room.id)} onClick={() => handleLike(room.id)} />
                                                </div>
                                            }
                                        </div>
                                        <div className="px-5 pb-5">
                                            <div>
                                                <div className=' flex justify-between'>
                                                    <Link state={{ data: room.id }} to={`/room/${encodeURIComponent(room.room_name)}`} className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_name}</Link>
                                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.beds} beds</h5>
                                                </div>
                                                <div className=' flex justify-between'>
                                                    <div >
                                                        <span className="text-lg font-bold text-emerald-400 dark:text-white">${room.price}</span>
                                                        <span className='text-lg font-bold text-slate-400'>/ Per Night</span>
                                                    </div>
                                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_styles.room_type}</h5>
                                                </div>

                                                <Button variant="text" className=' pl-0'>

                                                    <Link state={{ data: room.id }} to={`/room/${encodeURIComponent(room.room_name)}`} className="hover:text-orange-400 flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                                        Read More{" "}

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                            />
                                                        </svg>

                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ))}

                        </div>
                    </div>)
                : (<div className=' pb-52 font-Barlow-Regular bg-white relative '>
                    <div >
                        {/* Render children prop */}
                        {children}
                    </div>
                    <div className='max-w-[80%] h-auto m-auto  flex flex-wrap justify-between align-middle items-center'>
                        {data && data?.map((room) => (
                            <Fade bottom >
                                <div key={room?.id} id={`room_${room?.id}`} className=" hover:bg-slate-100 m-auto w-[-webkit-fill-available] xs:w-[24rem] mt-2 mb-4  bg-white  border-solid border-2 border-neutral-200 rounded-lg dark:bg-gray-800">
                                    <img className="relative top-[-1px] w-[24rem] mb-1 h-[20.5rem] rounded-md" src={`https://gotrip-api.iran.liara.run/${room.main_img}`} alt="product" />
                                    <div className='flex justify-between'>
                                        <div className="w-[9rem] sm:w-auto flex md:px-5 items-center mt-2.5 mb-5">
                                            {user && user && (
                                                <Stack spacing={1}>
                                                    {room_rate?.filter((like) => like.user_liked === user?.id && like.room === room.id)
                                                        .map((like) => (
                                                            <Rating
                                                                key={like.id}
                                                                value={like.score}
                                                                onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                                name="half-rating"
                                                                defaultValue={2.5}
                                                                disabled='true'
                                                            // precision={0.5}
                                                            />
                                                        ))}
                                                    {room_rate?.filter((like) => like.user_liked === user?.id && like.room === room.id)
                                                        .length === 0 && (
                                                            <Rating
                                                                value={0}
                                                                onChange={(event, newValue) => handleRating(newValue, room.id)}
                                                                name="half-rating"
                                                                defaultValue={2.5}

                                                            // precision={0.5}
                                                            />
                                                        )}
                                                </Stack>
                                            )}
                                            <span className={`bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ${user && 'ml-3'}`}>{RoomRateAverage(room.id)}</span>
                                            {/* {isLiked ? 'text-red-500' : 'text-gray-500'} */}
                                        </div>
                                        {user && room_likes &&
                                            <div className="App">
                                                <Heart isClick={room_likes?.some(like => like?.user_liked === user?.id && like?.room === room.id)} onClick={() => handleLike(room.id)} />
                                            </div>
                                        }
                                    </div>
                                    <div className="px-5 pb-5">
                                        <div>
                                            <div className=' flex justify-between'>
                                                <Link state={{ data: room.id }} to={`/room/${encodeURIComponent(room.room_name)}`} className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_name}</Link>
                                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.beds} beds</h5>
                                            </div>
                                            <div className=' flex justify-between'>
                                                <div >
                                                    <span className="text-lg font-bold text-emerald-400 dark:text-white">${room.price}</span>
                                                    <span className='text-lg font-bold text-slate-400'>/ Per Night</span>
                                                </div>
                                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.room_styles.room_type}</h5>
                                            </div>
                                            <Button variant="text" className=' pl-0'>
                                                <Link state={{ data: room.id }} to={`/room/${encodeURIComponent(room.room_name)}`} className=" hover:text-orange-400 flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                                    Read More{" "}

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="h-5 w-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                        />
                                                    </svg>

                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Fade>

                        ))}
                    </div>
                </div >)
            }

        </>

    )
};



export default Room;