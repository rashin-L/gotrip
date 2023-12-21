import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useRefreshUserMutation } from './redux/services/auth/refreshTokenAPI';
import queryString from 'query-string';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    localStorage.getItem('authToken');
    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? (jwtDecode(localStorage.getItem('authToken'))) : null);
    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') ? (JSON.parse(localStorage.getItem('authToken'))) : null);
    const [refreshUser] = useRefreshUserMutation();
    const[loading, setLoading] = useState(true)

    const setCurrentUser = (response) => {
        // const data = response.data;
        console.log('mydata: ', response.data);
        setAuthToken(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem('authToken', JSON.stringify(response.data));
        // console.log(authToken)
        // setUser(jwtDecode(response.access))
        console.log(user);

    };
    const LogoutUser = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('authToken')
        // navigator('/')
    };


    const updateToken = async () => {
        const response = refreshUser(queryString.stringify({
            refresh: authToken.refresh,
        }));
        response.then(async response => {
            console.log('updateToken')
            console.log(response)
            if (response.data) {
                setAuthToken(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('authToken', JSON.stringify(response.data));
            }
            else {
                LogoutUser()
            }
        })
    }

    const changeUser = (userData) => {
        setUser(userData);
    };


    const contextData = {
        setCurrentUser: setCurrentUser,
        LogoutUser: LogoutUser,
        updateToken: updateToken,
        changeUser:changeUser,
        user: user
    }

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4
        const interval = setInterval(() => {
            if(authToken){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authToken, loading])






    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};