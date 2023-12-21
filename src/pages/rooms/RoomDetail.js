import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useReservationMutation, useGetReservQuery } from '../../redux/services/rooms/reservationAPI';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import queryString from 'query-string';
import { TEInput, TERipple } from "tw-elements-react";
import { useFormik } from "formik";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useUpdateReservMutation } from '../../redux/services/rooms/reservationAPI';
import { useGetRoomQuery } from '../../redux/services/rooms/roomAPI';
import { useAddRateMutation } from '../../redux/services/rooms/roomAPI';
import { useGetCartQuery } from '../../redux/services/userPnael/userPnaelAPI';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';






function RoomDetail() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(user);
    const id = Number(location?.state?.data); // Access the props from the location state
    const update_reserv = location?.state?.reservation;

    const [reservation,] = useReservationMutation();
    const { data: reservData, refetch: refetchReserv } = useGetReservQuery();
    const [addRate, { error: likeError, isError: likeIsError }] = useAddRateMutation()
    const { data: rooms, } = useGetRoomQuery();
    const data = rooms?.ser_data?.filter((room) => room?.id === id);
    // if (data){
    // console.log(data[0]?.id)

    // }
    // console.log(reservData)
    // const roomReservData = reservData?.filter((reserv) => reserv.room === data[0]?.id);
    // console.log(roomReservData)

    const [currentImage, setCurrentImage] = useState(data && data[0]?.main_img && data && data[0]?.main_img);
    console.log(currentImage)
    // console.log(data && data[0]?.room_gallery && data && data[0]?.room_gallery)

    const { refetch: Cartrefetch } = useGetCartQuery(user?.id);
    const [endDate, setEndDate] = useState(update_reserv ? addDays(new Date(update_reserv.exit_date), 1) : addDays(new Date(), 1));
    const [startDate, setStartDate] = useState(update_reserv ? addDays(new Date(update_reserv.entry_date), 1) : addDays(new Date(), 1));
    const [disabledDates, setDisabledDates] = useState([]);
    const [updateReserv,] = useUpdateReservMutation();

    const excludeRanges = (startDateRange, endDateRange) => {
        const excludeDates = [];
        for (let date = startDateRange; date <= endDateRange; date.setDate(date.getDate() + 1)) {
            excludeDates.push(new Date(date));
        }
        return excludeDates
    }
    const removeDisabledDates = (datesToRemove) => {
        const updatedDisabledDates = disabledDates.filter(date => !datesToRemove.includes(date));
        setDisabledDates(updatedDisabledDates);
    };



    useEffect(() => {
        // console.log(currentImage)
        if (reservData && data) {
            // console.log(data);

            const roomReservData = reservData?.filter((reserv) => reserv.room === data[0]?.id);

            if (roomReservData) {
                // console.log(roomReservData);

                roomReservData.map((RRD) => {
                    const entryDate = RRD.entry_date;
                    const exitDate = RRD.exit_date;
                    const entryDateObj = new Date(entryDate);
                    const exitDateObj = new Date(exitDate);
                    const excludeDates = excludeRanges(addDays(entryDateObj, 1), addDays(exitDateObj, 1));

                    setDisabledDates((prevDisabledDates) => [...prevDisabledDates, ...excludeDates]);
                    return excludeDates;
                });

                if (update_reserv) {
                    const id = update_reserv?.id;
                    const startEditReservData = new Date(update_reserv?.entry_date);
                    const endeditReservData = new Date(update_reserv?.exit_date);
                    console.log(id);
                    const removeOfDisable = excludeRanges(addDays(startEditReservData, 1), addDays(endeditReservData, 1));
                    removeDisabledDates(removeOfDisable);
                }
            }
        }
        return ;
    }, [reservData, currentImage]);

    const dateFormat = (dateTime) => {
        const date = new Date(dateTime);
        const month = '' + (date.getMonth() + 1);
        const day = '' + date.getDate();
        const year = date.getFullYear();
        return [year, month, day].join('-');
    }
    const handleRating = async (newValue, room_id) => {

        if (likeIsError) {
            Swal.fire({
                icon: 'error',
                text: likeError.data,
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


    const form = useFormik({
        initialValues: {
            persons_number: update_reserv
                ? (update_reserv.persons_number) : (2),
        },

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const entryDate = dateFormat(startDate);
            const exitDate = dateFormat(endDate);
            if (update_reserv) {
                const id = update_reserv?.id;
                const response = updateReserv({
                    id: id,
                    entry_date: entryDate,
                    exit_date: exitDate,
                    reservatore: user?.id,
                    room: data && data[0]?.id,
                    // room: 3,
                    persons_number: values.persons_number
                });
                await Cartrefetch()

                response.then(async (response) => {
                    if (response.data) {
                        Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                        });
                        await Cartrefetch()
                        navigate('/cart');
                        // await refetchReserv()
                        // await Cartrefetch();
                    } else if (response?.error && response?.error?.data) {
                        Swal.fire({
                            icon: 'warning',
                            text: response.error.data.message.non_field_errors[0],
                        });
                        resetForm()
                    } else {
                        console.log(response);
                        Swal.fire({
                            icon: 'warning',
                            text: 'Unknown error occurred.',
                        });
                        resetForm()

                    }
                });
                resetForm()
            } else {
                try {
                    await Cartrefetch();
                    const userId = user?.id;

                    const response = await reservation(queryString.stringify({
                        entry_date: [entryDate],
                        exit_date: [exitDate],
                        reservatore: userId,
                        room: data && data[0]?.id,
                        persons_number: values.persons_number
                    }));
                    if (response.data) {
                        await Cartrefetch();
                        Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                        });
                        // resetForm();
                    } else if (response?.error && response?.error?.data) {
                        await Cartrefetch();
                        Swal.fire({
                            icon: 'warning',
                            text: response.error.data.message.non_field_errors[0],
                        });
                    } else {
                        await Cartrefetch();
                        Swal.fire({
                            icon: 'warning',
                            text: 'Unknown error occurred.',
                        });
                        // console.log('333333')
                        // resetForm();
                    }



                } catch (erro) {
                    console.log(erro);
                    localStorage.setItem('redirectUrl', window.location.pathname);
                    // console.log(data)
                    localStorage.setItem('room', JSON.stringify(id));
                    Swal.fire({
                        icon: 'info',
                        html:
                            'You have to <b><a style="color:#3fc3ee;" href="/login">Login</a></b> or <b><a style="color:#3fc3ee;" href="/register">Register</a></b> first',

                    });
                    // `/room/${data && data[0]?.name}`
                }
                finally {
                    resetForm();
                    // window.location.reload()
                }
            }
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);

        },
    })
    return (

        <div className='max-w-[80%] h-auto m-auto mt-14 font-Barlow-Regular'>
            <div className="  dark:bg-gray-800  ">
                <div className='flex flex-wrap gap-2'>
                    <img
                        className=" cursor-pointer  row-span-2 lg:col-span-2 mb-1 
                    w-[40rem] h-[24rem] rounded-md"
                        src={`https://gotrip-api.iran.liara.run/${currentImage}`}
                        alt="product"
                    />
                    {data && data[0]?.room_gallery && data && data[0]?.room_gallery.map((room_image) => (
                        <img
                            className=" flex-wrap cursor-pointer w-44 h-36 object-fill   mb-1  rounded-md"
                            src={`https://gotrip-api.iran.liara.run/${room_image.room_img}`}
                            alt="product"
                            onClick={() => setCurrentImage(room_image.room_img)}
                        />

                    ))}
                    <img
                        className="cursor-pointer w-44 h-36 object-fill relative top-[-1px]  mb-1  rounded-md"
                        src={`https://gotrip-api.iran.liara.run/${data && data[0]?.main_img && data && data[0]?.main_img}`}
                        alt="product"
                        onClick={() => setCurrentImage(data && data[0]?.main_img && data && data[0]?.main_img)}
                    />
                </div>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>{data && data[0]?.room_name}</h1>
                <div>
                    {user && user && (
                        <Stack spacing={1}>
                            {rooms?.ser_room_rating?.filter((like) => like?.user_liked === user?.id && like?.room === data[0]?.id)
                                ?.map((like) => (
                                    <>
                                        <Rating
                                            key={like.id}
                                            value={like.score}
                                            onChange={(event, newValue) => handleRating(newValue, data && data[0]?.id)}
                                            name="half-rating"
                                            defaultValue={2.5}
                                            disabled='true'
                                        // precision={0.5}
                                        />
                                    </>
                                ))}
                            {rooms?.ser_room_rating?.filter((like) => like?.user_liked === user?.id && like?.room === data[0]?.id)
                                .length === 0 && (
                                    <>
                                        <Rating
                                            value={0}
                                            onChange={(event, newValue) => handleRating(newValue, data && data[0]?.id)}
                                            name="half-rating"
                                            defaultValue={2.5}

                                        // precision={0.5}
                                        />
                                    </>

                                )}
                        </Stack>
                    )}

                </div>
                <div className=" pb-5">
                    <div>
                        <div>
                            <span className="text-lg font-bold text-emerald-400 dark:text-white">${data && data[0]?.price}</span>
                            <span className='text-lg font-bold text-slate-400'>/ Per Person</span>
                        </div>
                        <div className=' flex flex-col justify-start gap-5 mt-3'>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data && data[0]?.room_styles.room_type}</h5>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{data && data[0]?.beds} beds</h5>

                        </div>
                        <div>
                            <h4>{data && data[0]?.description}</h4>
                        </div>
                        <div className='xs:text-lg sm:text-xl md:text-2xl mt-10  flex flex-wrap justify-start gap-3 align-baseline'>
                            <>
                                <span className=' self-center'>Entry date:</span>
                                <div className=' border border-slate-300 rounded-sm p-2'>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        minDate={new Date()}
                                        endDate={endDate}
                                        excludeDates={disabledDates}
                                    />
                                </div>
                                <span className=' self-center'>Exit date:</span>

                                <div className=' border border-slate-300 rounded-sm p-2'>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={new Date()}
                                        excludeDates={disabledDates}
                                    />
                                </div>
                                <div className=' self-end text-lg'>
                                    <form className=' flex-wrap flex justify-between gap-12' onSubmit={form.handleSubmit}>

                                        {/* <!-- active code input --> */}
                                        <TEInput
                                            type="number"
                                            label="Persons Number"
                                            size="lg"
                                            className=" w-auto"
                                            name="persons_number"
                                            value={form.values.persons_number}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        ></TEInput>



                                        <div className="text-center lg:text-left">
                                            <TERipple rippleColor="light">
                                                <button
                                                    type="submit"
                                                    disabled={form.isSubmitting}
                                                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                >
                                                    {update_reserv
                                                        ? (form.isSubmitting ? <span>Loading...</span> : <span>Update</span>)
                                                        : (form.isSubmitting ? <span>Loading...</span> : <span>Book Room</span>)}

                                                </button>
                                            </TERipple>


                                        </div>
                                    </form>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;