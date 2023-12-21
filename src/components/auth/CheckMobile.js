
import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useRememberPasswordAPIMutation } from "../../redux/services/auth/registerAPI";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
import queryString from 'query-string';
import Swal from 'sweetalert2';


export default function CheckMobile() {
    // const [registerUser, { isLoading }, errors] = useRegisterUserMutation();
    // const [ registerUser, , { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();
    const [RememberPasswordAPI, { error, isError }] = useRememberPasswordAPIMutation();
    const navigate = useNavigate();
    const form = useFormik({
        initialValues: { mobile_number: "", },

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log(form.isSubmitting)
            console.log(values);
            if (isError) {
                console.log(error.data)
            }
            else {
                const response = await RememberPasswordAPI(queryString.stringify({
                    mobile_number: values.mobile_number,

                }));
                console.log(response)
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        // title: 'Yes...',
                        text: `Active code is send to Your email`,
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })
                    // navigate('/verify');
                    console.log(response.data.user.id)
                    navigate('/verify', { state: { check_mobile: true, user_id: response.data.user.id } });
                }else{
                    Swal.fire({
                        icon: 'warning',
                        text: response.error.data.non_field_errors[0],
                    });
                resetForm()

                }

                console.log(response)
                
                setTimeout(() => {
                    setSubmitting(false)
                }, 2000);
            }
            // navigate('/verify');
        },
        validate: (values) => {
            const errors = {};
            if (!values.mobile_number) {
                errors.mobile_number = 'we need your mobile number'
            }
            return errors
        }
    })


    return (
        <section className=" max-w-[80%] m-auto my-24 ">
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

                        <form onSubmit={form.handleSubmit}>

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




                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        disabled={form.isSubmitting}
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        {form.isSubmitting ? <span>Loading...</span> : <span>send</span>}

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