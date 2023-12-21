import React from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import { useFormik } from "formik";
import queryString from 'query-string';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';




function Checkout() {
    const DateDifference = (start_date, end_date) => {
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const diffInMilliseconds = Math.abs(endDate - startDate);
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        return diffInDays
    }

    const location = useLocation();
    const data = location;
    const totalOrderCost = data?.state?.data?.orders?.reduce((sum, order) => sum + order.total_price, 0);
    const totalReservCost = data?.state?.data?.reservations.reduce((sum, reserv) => sum + reserv.total_price, 0);
    const total = totalOrderCost + totalReservCost;
    const taxes = total * 0.05;
    const form = useFormik({

        initialValues: { name: data?.state?.data?.User?.name, family: data?.state?.data?.User?.family, mobile_number: data?.state?.data?.User?.mobile_number, email: data?.state?.data?.User?.email },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(form.isSubmitting)
            console.log(values);
            if ('isError') {
                // console.log(error.data.json())
            }
            else {
                const response = (queryString.stringify({
                    name: values.name,
                    family: values.family,
                    mobile_number: values.mobile_number,
                    password: values.password,
                    email: values.email
                }));
                console.log(response)

                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        // title: 'Yes...',
                        text: "Active code is send to Your Email",
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })

                    // navigate('/verify');
                    setTimeout(() => {
                        setSubmitting(false)
                    }, 2000);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        // title: 'Yes...',
                        text: response.error.data.mobile_number,
                    })
                }
                resetForm()


            }

        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = 'write your name please'
            } else if (values.name.length < 2) {
                errors.name = 'complete your name'
            }
            if (!values.family) {
                errors.family = 'write your family please'
            } else if (values.name.length < 2) {
                errors.family = 'complete your family'
            }
            if (!values.mobile_number) {
                errors.mobile_number = 'we need your mobile number'

            }

            if (!values.password) {
                errors.password = 'write a password please'

            }
            if (!values.repassword) {
                errors.repassword = 'write repassword please'

            }
            if (values.password !== values.repassword) {
                errors.repassword = 'The password and its repassword are not the same'
            }
            return errors
        }
    })
    return (
        <div className=' mt-24'>
            <div className=" my-6 max-w-[80%] m-auto font-Barlow-Regular flex justify-between gap-16 xs:flex-wrap md:flex-nowrap">
                <div className="flex flex-col  w-full px-0 mx-auto flex-wrap ">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 ">
                        <h2 className="text-xl font-bold mb-3">Reservation Summary
                        </h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-center font-semibold">Room</th>
                                    <th className="text-center font-semibold">Cost</th>
                                    <th className="text-center font-semibold">guests</th>
                                    <th className="text-center font-semibold">Days</th>
                                    <th className="text-center font-semibold">Total Cost</th>

                                </tr>
                            </thead>
                            {data?.state?.data?.reservations && data.state.data.reservations.map((reservation) =>
                                <tbody className='text-center'>
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex items-center flex-col align-middle">
                                                <span className="font-semibold">{reservation.room.room_name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">${reservation.room.price}</td>
                                        <td className="py-4 ">{reservation.persons_number}</td>
                                        <td className="py-4">
                                            {DateDifference(reservation.entry_date, reservation.exit_date)}days
                                        </td>
                                        <td className="py-4">
                                            ${DateDifference(reservation.entry_date, reservation.exit_date) * reservation.room.price}</td>
                                    </tr>
                                    {/* <!-- More product rows --> */}
                                </tbody>
                            )}
                        </table>
                    </div>
                    <div className="flex flex-col  5lg:ml-12 ">
                        <h2 className="mb-4 font-bold md:text-xl text-heading ">Customer Information
                        </h2>
                        <div className="mb-12 ">
                            <form id='my-form' onSubmit={form.handleSubmit}>
                                <div className=' flex justify-between'>
                                    {/* <!-- name input --> */}
                                    <div>
                                        <TEInput
                                            type="text"
                                            label="Name"
                                            size="lg"
                                            className="mb-6"
                                            name="name"
                                            value={form.values.name}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        ></TEInput>
                                        {form.errors.name && form.touched.name &&
                                            <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.name}</span>}
                                    </div>
                                    <div>
                                        {/* <!-- family input --> */}
                                        <TEInput
                                            type="text"
                                            label="Family"
                                            size="lg"
                                            className="mb-6"
                                            name="family"
                                            value={form.values.family}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        ></TEInput>
                                        {form.errors.family && form.touched.family &&
                                            <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.family}</span>}
                                    </div>



                                </div>
                                <div className=' flex justify-between'>
                                    <div>
                                        {/* <!-- Mobile input --> */}
                                        <TEInput
                                            type="text"
                                            label="Mobile Number"
                                            size="lg"
                                            className="mb-6"
                                            name="mobile_number"
                                            value={form.values.mobile_number}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        ></TEInput>
                                        {form.errors.mobile_number && form.touched.mobile_number &&
                                            <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.mobile_number}</span>}
                                    </div>
                                    <div>
                                        {/* <!-- Email input --> */}
                                        <TEInput
                                            type="email"
                                            label="Email"
                                            size="lg"
                                            className="mb-6"
                                            name="email"
                                            value={form.values.email}
                                            onChange={form.handleChange}
                                            onBlur={form.handleBlur}
                                        ></TEInput>
                                        {form.errors.email && form.touched.email &&
                                            <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.email}</span>}
                                    </div>
                                </div>

                                <div className="mb-6 flex items-center justify-between">
                                    {/* <!-- Remember me checkbox --> */}
                                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                            type="checkbox"
                                            value=""
                                            id="exampleCheck2"
                                        />
                                        <label
                                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="exampleCheck2"
                                        >
                                            Save this information for next time
                                        </label>
                                    </div>

                                    {/* <!--Forgot password link--> */}
                                    <a href="#!">Terms and conditions</a>
                                </div>

                                <div className="text-center lg:text-left">
                                    <TERipple rippleColor="light">
                                        <button
                                            type="submit"
                                            disabled={form.isSubmitting}
                                            className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            {form.isSubmitting ? <span>Loading...</span> : <span>Process</span>}

                                        </button>
                                    </TERipple>


                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col  w-full px-0 mx-auto flex-wrap '>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4 ">
                        <h2 className="text-xl font-bold mb-3">Order Summary
                        </h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-center font-semibold">Food</th>
                                    <th className="text-center font-semibold">Price</th>
                                    <th className="text-center font-semibold">Quantity</th>
                                    <th className="text-center font-semibold">Total</th>
                                </tr>
                            </thead>
                            {data?.state?.data?.orders && data?.state?.data?.orders.map((order) => (
                                <tbody className=' text-center' key={order.id}>
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex items-center flex-col align-middle">
                                                <span className="font-semibold">{order.food.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">${order.food.price}</td>
                                        <td className="py-4">
                                            <div className="flex items-center justify-center align-middle">
                                                <span className="text-center w-8">{order.foods_number}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">${(order.food.price) * (order.foods_number)}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                    <div className=' sm:w-full'>
                        <div
                            className="flex justify-between items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Subtotal<span className="ml-2">${total}</span></div>
                        <div
                            className="flex justify-between items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Taxes<span className="ml-2">${taxes}</span></div>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">${total + taxes}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;