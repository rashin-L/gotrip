/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useContext } from 'react';
import Room from '../../components/Room';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetReservQuery } from '../../redux/services/rooms/reservationAPI';
import { addDays } from 'date-fns';
import { FaCalendar } from 'react-icons/fa';
import { UserContext } from '../../UserContext';

function RoomsList({ data, isError, error, isLoading, room_rate, room_likes }) {
    const {user} = useContext(UserContext)

    // eslint-disable-next-line no-unused-vars
    const { data: reservData, refetch: refetchReserv } = useGetReservQuery();
    const allRooms = data?.ser_data;
    const [records, setRecords] = useState([]);
    const [recordsbool, setRecordsbool] = useState(false);
    const [endDate, setEndDate] = useState(data?.state?.reservation ? addDays(new Date(data.state.reservation.exit_date), 1) : new Date());
    const [startDate, setStartDate] = useState(data?.state?.reservation ? addDays(new Date(data.state.reservation.entry_date), 1) : new Date());
    const [disabledDates, setDisabledDates] = useState([]);

    const excludeRanges = (startDateRange, endDateRange) => {
        const excludeDates = [];
        for (let date = startDateRange; date <= endDateRange; date.setDate(date.getDate() + 1)) {
            excludeDates.push(new Date(date));
        }
        setDisabledDates(excludeDates);
    }

    useEffect(() => {

        // --------------------------------
        const roomReservData = reservData;
        if (roomReservData) {

            const entryDate = roomReservData[0]?.entry_date;
            const exitDate = roomReservData[0]?.exit_date;

            const entryDateObj = new Date(entryDate);
            const exitDateObj = new Date(exitDate);

            excludeRanges(addDays(entryDateObj, 1), addDays(exitDateObj, 1));

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allRooms, records, reservData]);


    const dateFormat = (dateTime) => {
        const date = new Date(dateTime);
        const month = '' + (date.getMonth() + 1);
        const day = '' + date.getDate();
        const year = date.getFullYear();
        return [year, month, day].join('-');
    }

    const handleSearch = () => {
        const entryDate = dateFormat(startDate)
        const exitDate = dateFormat(endDate)


        const excludedRooms = allRooms.filter((room) => {
            return !reservData.some((reservation) => {
                const reservationEntryDate = new Date(reservation.entry_date);
                const reservationExitDate = new Date(reservation.exit_date);

                return (
                    room.id === reservation.room &&
                    (
                        (reservationEntryDate <= new Date(entryDate) && reservationExitDate >= new Date(exitDate)) || // Complete overlap
                        (reservationEntryDate <= new Date(entryDate) && reservationExitDate >= new Date(entryDate)) || // Partial overlap (reservation starts before specified date range)
                        (reservationEntryDate >= new Date(entryDate) && reservationEntryDate <= new Date(exitDate)) // Partial overlap (reservation starts within specified date range)
                    )
                );
            });
        });

    setRecords(excludedRooms);
    setRecordsbool(true);
}



return (
    <div className=' '>
        <Room user={user} recordsbool={recordsbool} records={records} data={allRooms} isError={isError} error={error} isLoading={isLoading} room_rate={room_rate} room_likes={room_likes} >
            <div className=' font-Barlow-Regular text-lg max-w-[80%] m-auto  flex justify-start  mt-24  gap-5 bg-[#e8ac33] rounded-md mb-2 h-auto'>
                <div className=" p-3 w-[-webkit-fill-available] fill-ava flex  justify-between items-center j ">
                    <div className='flex justify-between align-top gap-5 flex-wrap'>
                        <>
                            <div className='flex justify-between align-middle items-center flex-wrap'>
                                <div className='flex justify-between align-middle items-center mr-3'>
                                    <FaCalendar size={20} />
                                    <span>Entry date:</span>
                                </div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    minDate={new Date()}
                                    endDate={endDate}
                                // excludeDates={disabledDates}
                                />
                            </div>

                            <div className='flex justify-between align-middle items-center flex-wrap'>
                                <div className='flex justify-between align-middle items-center mr-3'>
                                    <FaCalendar size={20} />
                                    <span>Exit date:</span>
                                </div>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date()}
                                // excludeDates={disabledDates}
                                />
                            </div>





                            <div className="text-center lg:text-left">
                                <button
                                    type="submit" onClick={handleSearch}
                                    className="inline-block rounded bg-primary px-7 py-2  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    <span>Search Room</span>
                                </button>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </Room >
    </div>
);
}

export default RoomsList;