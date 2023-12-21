import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const updateUserContext = (newUser) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUserContext }}>
            {children}
        </UserContext.Provider>
    );
};