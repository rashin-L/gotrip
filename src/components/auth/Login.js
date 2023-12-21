
import React, { useContext } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useLoginUserMutation } from "../../redux/services/auth/loginAPI";
import { useFormik } from "formik";
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { UserContext } from "../../UserContext";


export default function Login() {
    const userContext = useContext(UserContext);
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();



    const form = useFormik({
        initialValues: { mobile_number: "", password: "" },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const response = loginUser(queryString.stringify({
                mobile_number: values.mobile_number,
                password: values.password,
            }));
            response.then(async response => {
                // console.log(response)
                if (response.data) {
                    console.log(response)
                    userContext.setCurrentUser(response);
                    localStorage.setItem("loginCheck", true);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: "Your welcome In Gotrip"
                    })
                    const redirectUrl = localStorage.getItem('redirectUrl');
                    if (redirectUrl) {
                        navigate(`${redirectUrl}`,{state:{data:localStorage.getItem('room')}});

                    } else {
                        navigate('/');

                    }
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'warning',
                        title: "something wrong!"
                    })
                }
            });
            resetForm()
            setTimeout(() => {
                setSubmitting(false)
            }, 2000);


        },
        validate: (values) => {
            const errors = {};

            if (!values.mobile_number) {
                errors.mobile_number = 'we need your mobile number'

            }
            if (!values.password) {
                errors.password = 'write a password please'

            }

            return errors
        }

    });
    return (
        <section className=" max-w-[80%] m-auto my-12">
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
                            <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-blue-800">
                                <div className="bg-gray-100 flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                                    <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                                <div className="bg-gray-100 flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                    <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                                        <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                                    </svg>
                                </div>
                            </li>
                            <li className="flex items-center w-full">
                                <div className="bg-blue-100 flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                    <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                                    </svg>
                                </div>
                            </li>
                        </ol>
                        <form onSubmit={form.handleSubmit}>

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
                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        disabled={form.isSubmitting}
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        {form.isSubmitting ? <span>Loading...</span> : <span>Login</span>}

                                    </button>
                                </TERipple>

                                {/* <!-- Register link --> */}
                                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                    Don't have an account?{" "}
                                    <a
                                        href="#!"
                                        className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                    >
                                        Register
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

// Promise {

//     {type: 'mutation', endpointName: 'loginUser', originalArgs: 'mobile_number=09037525520&password=09037525520A', track: true, fixedCacheKey: undefined}
//     requestId
//     :
//     "VMKHhpxzCjCGZZAlF0Hbl"
//     reset
//     :
//     ƒ ()
//     unsubscribe
//     :
//     ƒ ()
//     unwrap
//     :
//     ƒ ()
//     [[Prototype]]
//     :
//     Promise
//     [[PromiseState]]
//     :
//     "fulfilled"
//     [[PromiseResult]]
//     :
//     Object
//     data
//     :
//     message
//     :
//     "You are login"
//     user
//     :
//     {id: 29, password: 'pbkdf2_sha256$600000$L8N6ch9dbnKXCRqEZwREkp$UCuFsmQlOAi/mNKSK3ACCy8QhawUc5o/fjWPUMW3Ayo=', last_login: '2023-10-02T06:13:04.327456Z', is_superuser: false, mobile_number: '09037525520', …}
//     [[Prototype]]
//     :
//     Object
//     [[Prototype]]
//     :
//     Object