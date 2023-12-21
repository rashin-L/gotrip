import React, {useEffect} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import store from './redux/store';
import Index from './components/Index';
import { Provider } from "react-redux";
import TopHeader from "./components/TopHeader"
import BaseHeader from "./components/BaseHeader"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UpdateUser from './components/auth/UpdateUser';
import Verify from './components/auth/Verify';
import FoodDetail from './pages/foods/FoodDetail';
import Footer from './components/Footer';
import RoomDetail from './pages/rooms/RoomDetail';
import Cart from './pages/userPnael/Cart';
import Dashboard from './pages/userPnael/Dashboard';
import RoomsList from './pages/rooms/RoomsList';
import FoodsList from './pages/foods/FoodsList';
import Favorites from './pages/userPnael/Favorites';
import { useGetRoomQuery } from './redux/services/rooms/roomAPI';
import ScrollToTop from './components/ScrollToTop';
import Checkout from './pages/userPnael/Checkout';
import ChangePassword from './components/auth/ChangePassword';
import Contct from './pages/hotel/Contact'
import Articles from './pages/blog/Articles';
import CheckMobile from './components/auth/CheckMobile'
import AboutMe from './pages/aboutMe/AboutMe';
import Advertising from './components/Advertising'


async function fetchData() {
  try {
    const response = await fetch("https://gotrip-api.iran.liara.run");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    // Process the data
  } catch (error) {
    throw error; // Rethrow the error to be caught by the ErrorBoundary
  }
}

library.add(faCheckSquare, faCoffee)




function App() {
  const { data: rooms, isError, error, isLoading } = useGetRoomQuery();
  // useEffect(()=>{
  //   fetchData()
  // })
  return (
    <div className=''>
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop />
            <TopHeader  />
            <BaseHeader />
            {/* <Advertising/> */}

            <Routes>
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/forget-password" element={<CheckMobile />} />
              <Route path="/change-password/:userId" element={<ChangePassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/update_user/:userId' element={<UpdateUser />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path="/" element={<Index data={rooms} isError={isError} error={error} isLoading={isLoading} />} />
              <Route path="/foods" element={<FoodsList />} />
              <Route path="/food/:foodName" element={<FoodDetail />} />
              <Route path="/rooms" element={<RoomsList data={rooms} isError={isError} error={error} isLoading={isLoading} />} />
              
              <Route path="/room/:roomName" element={<RoomDetail />} />
              <Route path="/contact" element={<Contct />} />
              <Route path="/blog" element={<Articles />} />

            </Routes>
            <Footer />
          </BrowserRouter>
        </Provider>
    </div>

  );
}

export default App;
