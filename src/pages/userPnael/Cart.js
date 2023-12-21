// import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteReservMutation } from '../../redux/services/rooms/reservationAPI';
import Swal from 'sweetalert2';
import { useUpdateOrderMutation } from '../../redux/services/foods/orderAPI';
import { useDeleteOrderMutation } from '../../redux/services/foods/orderAPI';
import { useGetCartQuery } from '../../redux/services/userPnael/userPnaelAPI';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { BiSolidCalendarEdit } from 'react-icons/bi';
import { UserContext } from '../../UserContext';
import Fade from 'react-reveal/Fade';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];








function Cart() {
    const { user } = React.useContext(UserContext);
    const { data: cart, isLoading, isError, error, refetch: Cartrefetch } = useGetCartQuery(user?.id);
    const [deletedReservationId, setDeletedReservationId] = React.useState(null);
    const [deleteReserv] = useDeleteReservMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const [updateOrder,] = useUpdateOrderMutation();
    // const [expire, setExpire] = useState(fa)
    const totalOrderCost = cart?.orders?.reduce((sum, order) => sum + order.total_price, 0);
    const totalReservCost = cart?.reservations.reduce((sum, reserv) => reserv.expire ? sum : sum + reserv.total_price, 0);
    const total = totalOrderCost + totalReservCost;
    const taxes = Math.round(total * 0.05);
    const DateDifference = (start_date, end_date) => {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const diffInMilliseconds = Math.abs(endDate - startDate);
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        return diffInDays
    }

    // convert 2023-10-04T01:01:06.511311Z to 2023-10-04 01:01:06
    const DateTimeFormat = (originalDateString) => {
        const formattedDate = new Date(originalDateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return formattedDate
    }
    const handleDelete = async (id, action) => {
        if (action === 'reservation') {
            await deleteReserv(id);
            // const reservDiv = document.getElementById(`reservDiv_${id}`).parentNode;
            // reservDiv.style.transition = 'opacity 0.3s';
            // reservDiv.style.opacity = 0;
            await Cartrefetch();
            setDeletedReservationId(id);
        } else if (action === 'order') {
            await deleteOrder(id);
            // const orderDiv = document.getElementById(`orderDiv_${id}`);
            // orderDiv.style.transition = 'opacity 0.3s';
            // orderDiv.style.opacity = 0;
            await Cartrefetch();
        }

        Swal.fire({
            icon: 'success',
            // title: 'Yes...',
            text: 'Successfully delete',
            // footer: '<a href="">Why do I have this issue?</a>'
        })



    }
    const changeNumber = async (status, id, foodsNumber) => {
        console.log(status);
        console.log(id);
        console.log(foodsNumber);

        if (status) {
            try {
                const response = await updateOrder({
                    id: id,
                    foods_number: foodsNumber + 1,
                    Client: user?.id,
                });

                Cartrefetch();

                console.log(response);
            } catch (error) {
                console.log(error);
            }
        } else {
            if (foodsNumber >= 2) {
                try {
                    const response = await updateOrder({
                        id: id,
                        foods_number: foodsNumber - 1,
                        Client: user?.id,
                    });

                    Cartrefetch();

                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
    if (isLoading) {
        return <div>Loading...</div>;

    }
    if (isError) {
        return <div>Error: {error.status} {console.log(error)}</div>;
    }

    return (
        <div>

            <div className="bg-gray-100 h-auto py-8 font-Barlow-Regular mt-8">
                <div className=" mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='md:w-3/4 mt-5 xs:w-full'>
                            <>
                                <TableContainer className=" rounded-lg shadow-md  mb-4" component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Room</StyledTableCell>
                                                <StyledTableCell align="center">Entry Date</StyledTableCell>
                                                <StyledTableCell align="center">Exit Date</StyledTableCell>
                                                <StyledTableCell align="center">Initial Capacity</StyledTableCell>
                                                <StyledTableCell align="center">guests</StyledTableCell>
                                                <StyledTableCell align="center">People</StyledTableCell>
                                                <StyledTableCell align="center">Days</StyledTableCell>
                                                <StyledTableCell align="center">Cost</StyledTableCell>
                                                <StyledTableCell align="center">Total Cost</StyledTableCell>
                                                <StyledTableCell align="center">Edit</StyledTableCell>
                                                <StyledTableCell align="center">Delete</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cart.reservations && cart.reservations.map((reservation) => (
                                                <StyledTableRow key={reservation.id} id={`reservDiv_${reservation.id}`} className={`text-center  ${reservation.expire ? "!bg-amber-400 rounded-sm" : ""}`}>
                                                    <StyledTableCell align="center" component="th" scope="row">
                                                    <div className=' flex flex-col items-center align-middle gap-1'>
                                                            <img className="h-16 w-16  m-auto" src={`https://gotrip-api.iran.liara.run${reservation.room.main_img}`} alt="food" />
                                                            {reservation.room.room_name}
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.entry_date}</StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.exit_date}</StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.room.main_capacity}</StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.room.addition_capacity}</StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.persons_number}</StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.days} days</StyledTableCell>
                                                    <StyledTableCell align="center">${reservation.room.price}</StyledTableCell>
                                                    <StyledTableCell align="center">${reservation.total_price}</StyledTableCell>
                                                    <StyledTableCell align="center">{reservation.expire
                                                        ? (<h2>Past</h2>)
                                                        : (<Link state={{ data: reservation.room.id, reservation: reservation }} to={`/room/${encodeURIComponent(reservation.room.room_name)}`} className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                            <BiSolidCalendarEdit style={{ margin: "auto", }} />
                                                        </Link>)
                                                    }</StyledTableCell>
                                                    <StyledTableCell className=' cursor-pointer' onClick={() => handleDelete(reservation.id, 'reservation')} align="right"><BiSolidTrashAlt style={{ margin: "auto", }} /></StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>

                            <>
                                <TableContainer className=" rounded-lg shadow-md  mb-4" component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Food</StyledTableCell>
                                                <StyledTableCell align="center">Price</StyledTableCell>
                                                <StyledTableCell align="center">Quantity</StyledTableCell>
                                                <StyledTableCell align="center">Order Date</StyledTableCell>
                                                <StyledTableCell align="center">Total</StyledTableCell>
                                                <StyledTableCell align="center">Delete</StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cart.orders && cart.orders.map((order) => (
                                                <StyledTableRow id={`orderDiv_${order.id}`} className=' text-center' key={order.id}>
                                                    <StyledTableCell component="th" scope="row" >
                                                        <div className=' flex flex-col items-center align-middle gap-1'>
                                                            <img className="h-16 w-16  m-auto" src={`https://gotrip-api.iran.liara.run${order.food.food_img}`} alt="food" />
                                                            {order.food.name}
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">${order.food.price}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <div className="flex items-center justify-center align-middle">
                                                            <button onClick={() => changeNumber(false, order.id, order.foods_number)} className="border rounded-md py-2 px-4 mr-2">-</button>
                                                            <span className="text-center w-8">{order.foods_number}</span>
                                                            <button onClick={() => changeNumber(true, order.id, order.foods_number)} className="border rounded-md py-2 px-4 ml-2">+</button>
                                                        </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{DateTimeFormat(order.order_date)}</StyledTableCell>
                                                    <StyledTableCell align="center">${(order.food.price) * (order.foods_number)}</StyledTableCell>
                                                    <StyledTableCell align="center" onClick={() => handleDelete(order.id, 'order')} className="py-4 cursor-pointer text-[-webkit-center]"><BiSolidTrashAlt style={{ margin: "auto", }} /></StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>

                        </div>

                        <div className="md:w-1/4 xs:w-full">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${total}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>${taxes}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">${total + taxes}</span>
                                </div>
                                <div className="bg-[#014b85] text-center py-2 px-4 rounded-lg mt-4 w-full ">
                                    <Link state={{ data: cart }} to={`/${encodeURIComponent('checkout')}`} className="text-xl font-semibold tracking-tight text-white ">Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;