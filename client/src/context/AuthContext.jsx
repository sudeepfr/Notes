import { createContext, useState, useEffect } from 'react'
import api from '../api/axios';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {     
        const loadUser = async () => {
            // const token = localStorage.getItem("token");
            // console.log(token);
            // if (!token) {
            //     setLoading(false);
            //     return;
            // }
            try {
                const res = await api.get(`/api/auth/me`);
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
                // localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post(`/api/auth/login`, { email, password });
        // localStorage.setItem("token", res.data.token);
        setUser(res.data.user);

    }

    const register = async (name, email, password) => {
        try {
            const res = await api.post(`/api/auth/register`, { name, email, password });
            setRegistered(true);

        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        await api.post(`/api/auth/logout`);
        // localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={
            {
                user,
                setUser,
                login,
                register,
                logout,
                loading,
                registered,
                setRegistered
            }} >
            {children}
        </AuthContext.Provider>
    );
};