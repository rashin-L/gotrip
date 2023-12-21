import React, {useContext} from 'react';
import { useGetLikeFoodQuery } from '../../redux/services/foods/foodAPI ';
import { useGetRoomQuery } from '../../redux/services/rooms/roomAPI';
import { useGetFoodQuery } from '../../redux/services/foods/foodAPI ';
import Food from '../../components/Food'
import Room from '../../components/Room';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ChairTwoToneIcon from '@mui/icons-material/ChairTwoTone';
import BrunchDiningTwoToneIcon from '@mui/icons-material/BrunchDiningTwoTone';
import { UserContext } from '../../UserContext';


function Favorites() {
    const { user } = useContext(UserContext);

    const { data: rooms, } = useGetRoomQuery();
    const { data: foodLikes } = useGetLikeFoodQuery();
    const { data: foods } = useGetFoodQuery();
    const [value, setValue] = React.useState(0);
    const room_likes = rooms?.ser_room_likes;
    const all_rooms = rooms?.ser_data;
    let data_list = []

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value)
        if (value === 0) {
            document.getElementById('foods').classList.add('hidden');
            document.getElementById('rooms').classList.remove('hidden');
            console.log(document.getElementById('rooms'))
        }
        else if (value === 1) {
            document.getElementById('rooms').classList.add('hidden');
            document.getElementById('foods').classList.remove('hidden');
        }
    };


    return (
        <div className=' mt-12'>
            <Box sx={{ width: '100%',}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab icon={<BrunchDiningTwoToneIcon />} label="Favorit Foods" />
                    <Tab icon={<ChairTwoToneIcon />} label="Favorit Rooms" />
                </Tabs>
            </Box>
            <div id='foods' className=' mb-20 flex max-w-[80%] m-auto justify-between items-center gap-5 flex-wrap'>
                {/* Favorit Foods */}
                {foods && foods.map((food) => (
                    <>
                        {foodLikes?.filter(like => like?.user_liked === user?.id && like?.food === food.id).map(like => (
                            <div key={like.id}> {/* Add flex class */}
                                {foods && foods.filter((allFood) => allFood?.id === like.food).map(favoriteFood => (
                                    <Food food={favoriteFood}  condition={false} className='flex' />
                                ))}
                            </div>
                        ))}
                    </>
                ))}
                {/* Favorit Foods */}
            </div>
            {/* Favorit Rooms */}
            <div id='rooms' className=' mt-10'>
                {room_likes &&
                    room_likes
                        .filter((liked) => liked.user_liked === user?.id)
                        .map((like) => {
                            const data = all_rooms?.filter((room) => room.id === like?.room);
                            data_list.push(data[0]);
                            return null;
                        })}
                <Room data={data_list}  />
            </div>

            {/* Favorit Rooms */}

        </div>
    );
}
export default Favorites;

