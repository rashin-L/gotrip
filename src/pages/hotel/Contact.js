
import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useAddMessageMutation } from "../../redux/services/hotel/hotelAPI";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';






export default function UpdateUser() {

    const [addMessage, { error, isError }] = useAddMessageMutation();
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: {
            name: "", family: "", mobile_number: "",
            email: "", subject: "", message: ""
        },

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log('gggg')
            console.log(form.isSubmitting)
            console.log(values);
            if (isError) {
                console.log(error.data.json())
            }
            else {
                const response = await addMessage({
                    first_name: values.name,
                    last_name: values.family,
                    email: values.email,
                    mobile_number: values.mobile_number,
                    subject: values.subject,
                    message: values.message,
                });
                console.log(response)
                if (response.data) {
                    console.log(response.data.user)

                    Swal.fire({
                        icon: 'success',
                        // title: 'Yes...',
                        text: response.data.message
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })
                    
                    navigate('/');

                    setTimeout(() => {
                        setSubmitting(false)
                    }, 2000);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        // title: 'Yes...',
                        text: response.error.data,
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
                errors.mobile_number = 'we need your mobile_number'

            }
            if (!values.email) {
                errors.email = 'we need your email number'

            }
            if (!values.subject) {
                errors.subject = 'write a subject please'

            }
            if (!values.message) {
                errors.message = 'write the message please'
            }
            return errors
        }
    })


    return (
        <section className=" max-w-[80%] m-auto my-12 ">
            <div className="h-full">
                {/* <!-- Left column container with background--> */}
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample"
                        />
                    </div>

                    {/* <!-- Right column container --> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 mt-5">
                        <form id='my-form' onSubmit={form.handleSubmit}>

                            {/* <!-- name input --> */}
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
                            {/* <!-- Family input --> */}
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
                            {/* <!-- Mobile input --> */}
                            <TEInput
                                type="text"
                                label="Mobile Number"
                                size="lg"
                                className="mb-3"
                                name="mobile_number"
                                value={form.values.mobile_number}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.mobile_number && form.touched.mobile_number &&
                                <span className=" relative top-[-0.9rem] text-[#e34543]">{form.errors.mobile_number}</span>}
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

                            {/* <!-- subject input --> */}
                            <TEInput
                                type="text"
                                label="Subject"
                                size="lg"
                                className="mb-6"
                                name="subject"
                                value={form.values.subject}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.subject && form.touched.subject &&
                                <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.subject}</span>}
                            {/* <!-- message input --> */}
                            <TEInput
                                type="text"
                                label="Message"
                                size="lg"
                                className="mb-6"
                                name="message"
                                value={form.values.message}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.message && form.touched.message &&
                                <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.message}</span>}
                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        disabled={form.isSubmitting}
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        {form.isSubmitting ? <span>Loading...</span> : <span>Send</span>}

                                    </button>
                                </TERipple>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}