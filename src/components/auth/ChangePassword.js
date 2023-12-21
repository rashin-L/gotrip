
import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useUpdateUserMutation, } from '../../redux/services/auth/registerAPI';
import { useChangePasswordMutation } from "../../redux/services/auth/registerAPI";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import queryString from 'query-string';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';







export default function ChangePassword() {
    const location = useLocation();
    const data = location;
    console.log(data)
    const [ChangePassword, { error, isError }] = useChangePasswordMutation();
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: {
            password: "", repassword: ""
        },

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log('ggghhhg')
            console.log(form.isSubmitting)
            console.log(values);
            if (isError) {
                console.log(error.data.json())
            }
            else {
                const response = await ChangePassword({
                    id: data?.state?.user?.id,
                    password: String(values.password),
                    
                });

                if (response.data) {
                    console.log(response.data.user)


                    Swal.fire({
                        icon: 'success',
                        // title: 'Yes...',
                        text: response.data
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })
                    console.log(response)

                    navigate('/dashboard');
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

                            {/* <!--Password input--> */}
                            <TEInput
                                type="password"
                                label="Password"
                                className="mb-6"
                                name="password"
                                size="lg"
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.password && form.touched.password &&
                                <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.password}</span>}
                            {/* <!--Repassword input--> */}
                            <TEInput
                                type="password"
                                label="Repassword"
                                className="mb-6"
                                name="repassword"
                                size="lg"
                                value={form.values.repassword}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.repassword && form.touched.repassword &&
                                <span className=" relative top-[-1.5rem] text-[#e34543]">{form.errors.repassword}</span>}

                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        disabled={form.isSubmitting}
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        {form.isSubmitting ? <span>Loading...</span> : <span>Update</span>}

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