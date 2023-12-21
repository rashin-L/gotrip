import React, { useState, useEffect } from 'react';
import { useGetFoodQuery } from '../../redux/services/foods/foodAPI ';
import Food from '../../components/Food';


function FoodsList(user, handleUserChange) {
    const { data: foods } = useGetFoodQuery();
    const [records, setRecords] = useState([]);

    const [recordsbool, setRecordsbool] = useState(false);
    const [filters, setFilters] = useState({
        filterName: '',
        filterPrice: '',
        filterBeds: ''
    });
    useEffect(() => {
        const { filterName } = filters;

        let filteredFood = (foods ?? []).filter((food) => {

            return food.name.toLowerCase().includes(filterName.toLowerCase())
        });


        setRecords(filteredFood);
        setRecordsbool(true);
    }, [filters, foods])


    const changeHandler = (event) => {
        let filterName = event.target.value;
        setFilters((prevFilters) => ({ ...prevFilters, filterName }));
        return filterName;
    };


    return (
        // <div className=' bg-brown-wood pb-16'>
        <div className='  pb-16 font-Barlow-Regular mt-24'>
            <div className='max-w-[80%] m-auto  flex justify-start mt-11  h-14 mb-2'>
                <div className=" p-2 w-[-webkit-fill-available] fill-ava flex  justify-between items-center j bg-[#e8ac33] rounded-md">
                    <div className='flex justify-between align-top'>
                        <div className="pl-2 bg-[#e8ac33] mt-[6px]">
                            <svg className="fill-current  text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path className="heroicon-ui"
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </div>
                        <input
                            className=" text-lg font-bold placeholder-[#6b7280] w-auto rounded-md bg-[#e8ac33] text-white leading-tight focus:outline-none py-2 px-2"
                            id="search" type="text" placeholder="Search Room" onChange={changeHandler} value={filters.filterName} />
                    </div>

                </div>
            </div>
            <div className=' flex max-w-[80%] m-auto justify-between items-center gap-5 flex-wrap'>

                {recordsbool
                    ? (records && records.map((food) => (
                        <Food food={food} user={user} condition={false} />
                    )))
                    : (foods && foods.map((food) => (
                        <Food food={food} condition={false} user={user} />
                    )))}
            </div>


        </div>
    );
}

export default FoodsList;