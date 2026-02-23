import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ 
                    id: payload.user_id, 
                    email: payload.email, 
                    type: payload.user_type 
                });
            } catch (error) {
                console.error('Invalid token');
                logout();
            }
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        setToken(response.data.token);
        return response.data.user;
    };

    const register = async (userData) => {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        return response.data;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
