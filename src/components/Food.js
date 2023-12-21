import React, { useState, useContext } from 'react';
import Heart from "react-animated-heart";
import { useAddFoodLikeMutation } from '../redux/services/foods/foodAPI ';
import Swal from 'sweetalert2';
import queryString from 'query-string';
import { useGetLikeFoodQuery } from '../redux/services/foods/foodAPI ';
import { useAddOrderMutation } from '../redux/services/foods/orderAPI';
import { useDeleteFoodLikeMutation } from '../redux/services/foods/foodAPI ';
import { useGetCartQuery } from '../redux/services/userPnael/userPnaelAPI';
import Fade from 'react-reveal/Fade';
import Tada from 'react-reveal/Tada';
import { UserContext } from '../UserContext';



function Food({ food, children, condition }) {
    const { user } = useContext(UserContext)

    const { data: cart, refetch: Cartrefetch } = useGetCartQuery(user?.id);
    const foodIdExists = cart?.orders?.some((order) => order.food.id === food.id);
    const [addLike, { error: likeError, isError: likeIsError }] = useAddFoodLikeMutation()
    const [addOrder, { error, isError }] = useAddOrderMutation();



    const { data: foodLikes, refetch } = useGetLikeFoodQuery();
    const [isLiked, setIsLiked] = useState(false);
    const [deleteFoodLike] = useDeleteFoodLikeMutation();


    const isFind = (id) => {
        return cart?.orders?.some((element) => {
            if (element?.food.id === id) {
                return true;
            }
            return false;
        });
    };

    const addToOrder = async (food) => {
        try {
            await Cartrefetch();
            const userId = user?.id;
            if (isError) {
                console.log(error.data);
            } else {
                if (await isFind(food.id)) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'You have already ordered this food!',
                    });
                } else {
                    const response = await addOrder(queryString.stringify({
                        foods_number: 1,
                        Client: userId,
                        food: food.id,
                    }));
                    console.log(response)
                    Cartrefetch()

                    if (response?.data) {
                        Swal.fire({
                            icon: 'success',
                            text: response.data.message,
                        });
                    } else if (response?.error && response.error.data) {
                        Swal.fire({
                            icon: 'warning',
                            text: response.error.data.message,
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            text: 'Unknown error occurred.',
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'info',
                html:
                    'You have to <b><a href="/login">Login</a></b> or <b><a href="/register">Register</a></b> first',
            });
        }
    };


    const handleLike = async (food_id) => {
        if (likeIsError) {
            // console.log(likeError.data);
            Swal.fire({
                icon: 'error',
                text: likeError.data,
            });
        } else {
            const like = foodLikes?.find(like => like?.user_liked === user?.id && like?.food === food.id);
            if (like) {

                await deleteFoodLike(like.id);
                // const foodDiv = document.getElementById(`food_${food_id}`);
                // foodDiv.style.transition = 'opacity 0.8s';
                // foodDiv.style.opacity = 0;
                await refetch()
            }
            else {
                const response = addLike(queryString.stringify({
                    food: parseInt(food_id),
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

    return (

        <div id={`food_${food.id}`} className={`font-Kalam-Regular text-stone-100 my-3 ${condition ? 'fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm' : ' flex flex-col justify-center items-center mt-[-2rem] '}`}>
            <div className={` ${condition ? '' : 'flex items-center justify-center'}`}></div>
            <div className="  top-11  rounded-lg relative">

                <div className=' h-auto max-w-[15rem] xs:max-w-[32rem]   bg-food-pattern bg-cover p-3 bg-no-repeat   float-right  rounded-lg'>

                    <div className='flex flex-wrap justify-between'>
                        <Tada>
                            <img className='w-28 h-36 sm:w-36 sm:h-40   md:w-56 md:h-60 '
                                src={`https://gotrip-api.iran.liara.run${food.food_img}`} alt={food.name}>
                            </img>
                        </Tada>
                        <div className=' '>
                            {user &&
                                foodLikes &&
                                <div className="App">
                                    <Heart isClick={foodLikes?.some(like => like?.user_liked === user?.id && like?.food === food.id)} onClick={() => handleLike(food.id)} />
                                </div>
                            }
                        </div>

                    </div>
                    <div className='flex items-end justify-between  flex-col'>

                        <div className='bg-red_paint_n ml-0  bg-contain  bg-no-repeat text-3xl bg-origin-content w-[15rem] sm:w-[17rem] h-[6rem]  font-bold font-Kalam-Bold z-0 block'>
                            <h2 className='text-2xl sm:text-3xl text-center m-auto mt-4 sm:mt-6'>{food.name}</h2>
                        </div>
                    </div>


                    <h2 className=' text-xl '>{food.description}</h2>
                    <div className='  bottom-1 w-full'>
                        <div className='flex flex-wrap justify-between align-top  p-4 '>
                            <div>
                                <span className=' text-2xl'>CONTENT:</span>
                                {food.food_content && food.food_content.map((content, index) => (
                                    <h2 key={content.name} className=''>
                                        <div className=' flex justify-start gap-10 child:text-lg'>
                                            <span className=''>{content.name}</span>
                                            <span>{content.grams_weight} gr</span>
                                        </div>
                                    </h2>
                                ))}
                            </div>
                            <div>
                                <h5 className=' text-3xl mr-10'>Price: {food.price} $</h5>
                                <Fade left >

                                    {foodIdExists
                                        ? (<img className='w-32 h-28' src='/media/images/order2.png' alt='order' />)
                                        : (<img className='w-32 h-28 cursor-pointer' onClick={() => addToOrder(food)} src='/media/images/order.png' alt='order' />)
                                    }
                                </Fade >
                            </div>
                        </div>
                    </div>

                </div>
                <div className='relative left-24 top-6'>
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Food;