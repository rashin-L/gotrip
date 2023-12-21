

import React, { useEffect, useState } from 'react';

const CurrentUser = (WrappedComponent, onUserChange) => {
    const EnhancedComponent = (props) => {
        const [user, setUser] = useState(null);

        useEffect(() => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }, []);

        const handleLogin = (userData) => {
            setUser(userData);
            onUserChange(userData);
        };

        const handleLogout = () => {
            setUser(null);
            onUserChange(null);
        };
        const handleUserChange = (userData) => {
            
            setUser(userData);
        };

        return (
            <WrappedComponent
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}

                {...props}
            />
        );
    };

    return EnhancedComponent;
};

export default CurrentUser;
