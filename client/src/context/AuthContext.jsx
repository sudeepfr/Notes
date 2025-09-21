import {createContext,useState,useEffect} from 'react'
import api from "../api/axios";
export const AuthContext=createContext();

export const AuthProvider=({children})=>{

     const[user,setUser]=useState(null);
     const[loading,setLoading]=useState(true);

     //check  if  user is already logged in (via cookie)

     useEffect(()=>{
        const loadUser=async()=>{
             try {
                 const res=await api.get('/api/auth/me');
                 setUser(res.data.user);
             }catch (error){ 
                setUser(null);
             }finally{
                 setLoading(false);
             }
        };
        loadUser();
     },[]);
  
      const login=async(email,password)=>{
         const res=await api.post(('/api/auth/login',{email,password}));
         setUser(res.data.user);
      }
      const register=async(name,email,password)=>{
        const res=await api.post('/api/auth/register',{name,email,password});
        setUser(res.data.user);
      }

      const logout=async()=>{
         await api.post('/api/auth/logout');
         setUser(null);
      }

return (
    <AuthContext.Provider value={
        { 
            user,
            login,
            register,
            logout,
            loading,
            }} >
        {children}
    </AuthContext.Provider>
);
};