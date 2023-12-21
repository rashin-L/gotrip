
import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useCreateUserMutation, } from '../../redux/services/auth/registerAPI';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import Swal from 'sweetalert2';




export default function Register() {
    const [createUser, { error, isError }] = useCreateUserMutation();
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: { name: "", family: "", mobile_number: "", password: "", repassword: "", email: "" },

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(form.isSubmitting)
            console.log(values);
            if (isError) {
                console.log(error.data)
            }
            else {
                const response = await createUser(queryString.stringify({
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

                    navigate('/verify');
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
        <section className=" max-w-[80%] m-auto my-20">
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
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <ol className="flex items-center w-full mb-4 sm:mb-5">
                            <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                                    <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                    <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                                        <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="flex items-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                    <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                                    </svg>
                                </div>
                            </li>
                        </ol>
                        <form id='my-form' onSubmit={form.handleSubmit}>
                            
                            {/* <!-- name input --> */}
                            <TEInput
                                type="text"
                                label="Name"
                                size="lg"
                                className="mb-3"
                                name="name"
                                value={form.values.name}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.name && form.touched.name &&
                                <span className=" relative top-[-0.9rem] text-[#e34543]">{form.errors.name}</span>}
                            {/* <!-- Mobile input --> */}
                            <TEInput
                                type="text"
                                label="Family"
                                size="lg"
                                className="mb-3"
                                name="family"
                                value={form.values.family}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.family && form.touched.family &&
                                <span className=" relative top-[-0.9rem] text-[#e34543]">{form.errors.family}</span>}
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
                                className="mb-3"
                                name="email"
                                value={form.values.email}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.email && form.touched.email &&
                                <span className=" relative top-[-0.9rem] text-[#e34543]">{form.errors.email}</span>}
                            {/* <!--Password input--> */}
                            <TEInput
                                type="password"
                                label="Password"
                                className="mb-3"
                                name="password"
                                size="lg"
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.password && form.touched.password &&
                                <span className=" relative top-[-0.9rem] text-[#e34543]">{form.errors.password}</span>}
                            {/* <!--Repassword input--> */}
                            <TEInput
                                type="password"
                                label="Repassword"
                                className="mb-3"
                                name="repassword"
                                size="lg"
                                value={form.values.repassword}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            ></TEInput>
                            {form.errors.repassword && form.touched.repassword &&
                                <span className=" relative top-[-0.9rem] text-[#e34543]">{form.errors.repassword}</span>}

                            <div className="mb-3 flex items-center justify-between">
                                {/* <!-- Remember me checkbox --> */}
                                {/* <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
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
                                        Remember me
                                    </label>
                                </div> */}

                                {/* <!--Forgot password link--> */}
                                <a href="#!">Terms and conditions</a>
                            </div>

                            {/* <!-- Login button --> */}
                            {/* if (errors) {
                                <span>{errors}</span>
                            } */}

                            <div className="text-center lg:text-left flex justify-between">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        disabled={form.isSubmitting}
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        {form.isSubmitting ? <span>Loading...</span> : <span>Register</span>}

                                    </button>
                                </TERipple>

                                {/* <!-- Register link --> */}
                                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                    Have an account?{" "}
                                    <a
                                        href="#!"
                                        className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                    >
                                        <Link to='/login'>Login</Link>

                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}