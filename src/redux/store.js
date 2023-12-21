import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { hotelAPI } from "./services/hotel/hotelAPI";
import { registerAPI } from "./services/auth/registerAPI";
import { verifyAPI } from "./services/auth/verifyAPI";
import { loginAPI } from "./services/auth/loginAPI";
import { refreshAPI } from "./services/auth/refreshTokenAPI";
import { logoutAPI } from "./services/auth/logoutAPI";
import { roomAPI } from "./services/rooms/roomAPI";
import { foodAPI } from "./services/foods/foodAPI ";
import { foodTypesAPI } from "./services/foods/foodTypesAPI";
import { orderAPI } from "./services/foods/orderAPI";
import { reservationAPI } from "./services/rooms/reservationAPI";
import { userPnaelAPI } from "./services/userPnael/userPnaelAPI";
import { articleAPI } from "./services/blog/ArticleAPI";
import { advertisingAPI } from "./services/blog/AdvertisingAPI";



const store = configureStore({
    reducer:{
        [hotelAPI.reducerPath]: hotelAPI.reducer,
        [registerAPI.reducerPath]: registerAPI.reducer,
        [roomAPI.reducerPath]: roomAPI.reducer,
        [foodAPI.reducerPath]: foodAPI.reducer,
        [foodTypesAPI.reducerPath]: foodTypesAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [reservationAPI.reducerPath]: reservationAPI.reducer,
        [verifyAPI.reducerPath]: verifyAPI.reducer,
        [loginAPI.reducerPath]: loginAPI.reducer,
        [refreshAPI.reducerPath]: refreshAPI.reducer,
        [logoutAPI.reducerPath]: logoutAPI.reducer,
        [userPnaelAPI.reducerPath]: userPnaelAPI.reducer,
        [articleAPI.reducerPath]: articleAPI.reducer,
        [advertisingAPI.reducerPath]: advertisingAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(hotelAPI.middleware)
        .concat(registerAPI.middleware)
        .concat(roomAPI.middleware)
        .concat(foodAPI.middleware)
        .concat(foodTypesAPI.middleware)
        .concat(orderAPI.middleware)
        .concat(reservationAPI.middleware)
        .concat(verifyAPI.middleware)
        .concat(loginAPI.middleware)
        .concat(refreshAPI.middleware)
        .concat(logoutAPI.middleware)
        .concat(userPnaelAPI.middleware)
        .concat(articleAPI.middleware)
        .concat(advertisingAPI.middleware)
})
setupListeners(store.dispatch)

export default store;