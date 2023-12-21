
import { useGetFoodQuery } from '../../redux/services/foods/foodAPI ';
import { useGetFoodTypesQuery } from '../../redux/services/foods/foodTypesAPI';
import { useAddOrderMutation } from '../../redux/services/foods/orderAPI';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slide from 'react-reveal/Slide';
import { useState, useContext } from 'react';
import Food from '../../components/Food';
import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Spin from 'react-reveal/Spin';
import Reveal from 'react-reveal/Reveal';
import { UserContext } from '../../UserContext';




const Foods = () => {
    const {user} = useContext(UserContext)

    const { data: foods, isError, error, isLoading } = useGetFoodQuery();
    const { data: foodTypes, } = useGetFoodTypesQuery();
    const [addOrder] = useAddOrderMutation();
    const [isShownId, setIsShownId] = useState(false)
    const [mystyle, setmystyle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState('')


    const openModal = (food) => {
        setIsModalOpen(true);
        setSelectedFood(food);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }
    if (isError) {

        return <div>Error: {error.message}{console.log(error.status)}{console.log(foods)}</div>


    }
    const addToOrder = async (id) => {
        if (user) {
            const userId = user.id;
            console.log(userId)
        }
        const userId = 1;



        try {
            const payload = await addOrder({
                foods_number: 1,
                Client: userId,
                food: id,
                id: id
            })
            console.log('fulfilled', payload);
            console.log('order successful:', payload.data);
        } catch (error) {
            console.log('order error:', error);
            console.log('Raw response:', error.response);
        }

    }
    const handleClick = (id) => {
        setIsModalOpen(false);
        setIsShownId(id);
        setmystyle(prevstate => ({
            ...mystyle,
            [id]: !prevstate[id]
        }))
    };

    return (
        <div className='bg-white relative'>
            <div className='font-Barlow-Regular max-w-[80%] h-auto  m-auto mt-32 '>
                <h4 className=' text-amber-400 text-center text-xl mb-2 pt-5'>FRESH FOODS</h4>
                <h3 className=' text-center text-6xl mb-12 font-bold'>Restaurant Menu</h3>

                <div className=' mb-20 flex flex-wrap justify-between align-middle items-center'>

                    <Spin>
                        {foodTypes && foodTypes.map((type, i) => (
                            <div key={type.id}>
                                <div key={type.id} className={`flex flex-wrap my-12  
                            align-middle justify-center items-center w-full
                        `}>
                                    <div
                                        onClick={() => {
                                            handleClick(type.id);
                                        }} className='  z-10  order-2 cursor-pointer'>
                                        <img
                                            className={` rounded-full w-[20rem] h-[20rem]   border-4  ${isShownId === type.id ? "border-y-red-600 border-x-amber-400" : "border-amber-400"}`}
                                            src={`https://gotrip-api.iran.liara.run${type.food_img}`}
                                            alt="img"
                                        />
                                    </div>
                                    {isShownId === type.id
                                        ? (<Reveal effect="fadeInUp" effectOut="fadeOutLeft">
                                            <div
                                                className={`overflow-x-hidden ${i % 2 === 0 ? "order-2" : "order-1"}`}>
                                                <Slide left={i % 2 === 0} right={i % 2 !== 0}>
                                                    <div className='  block '>
                                                        {type.foods_type?.map((food) => (
                                                            <div className='mt-4 px-3 '>
                                                                {/* <div className='' key={food.id}>
                                                                    <h2 className=' text-lg font-bold'>{food.name}</h2>

                                                                </div> */}
                                                                <div className='flex flex-wrap justify-between items-center align-baseline'> 
                                                                    {/* <div>
                                                                        {food.food_content && food.food_content.map((content, index) => (
                                                                            <h2 key={content.name} className=' inline'>
                                                                                {content.name}
                                                                                {index !== food.food_content.length - 1 && ','}
                                                                            </h2>
                                                                        ))}
                                                                    </div> */} 
                                                                    {/* <hr className=' border-gray-600 mt-4 border-dashed h-1 w-24 mx-3' /> */}
                                                                    <div className='flex child:mr-2 items-center'>
                                                                        {/* <h2>{food.price}$</h2> */}
                                                                        <div onClick={() => openModal(food)} class=" cursor-pointer relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
                                                                            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                                                                <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                                                            </span>
                                                                            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                                                            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">{food.name}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Slide>
                                            </div>
                                        </Reveal>)
                                        : (<div className=' w-0'></div>)
                                    }
                                </div>
                            </div>
                        ))}
                    </Spin>

                </div>
                <div className=' relative'>
                    {/* 0000000 */}
                    <div onClose={closeModal}>
                        {isModalOpen && (
                            <Food food={selectedFood} addToOrder={addToOrder} condition={true}>
                                <button
                                    className="absolute left-[-4rem] text-gray-500 hover:text-gray-700"
                                    onClick={closeModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button></Food>
                        )}
                    </div>
                </div>
            </div >
        </div>
    )
};



export default Foods;