import {useState,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login=()=>{
    const [form,setForm]=useState({email:'',password:''});
    const {user,login,loading}=useContext(AuthContext);
    const navigate=useNavigate();

        const handleSubmit=async()=>{
             e.preventDefault();
             try{
                 await login(form.email,form.password);
                 navigate('/notes');
             }catch(error){
                 alert(err.response?.data?.message || 'Login failed');
             }
        }
        if (loading) return <p>Loading...</p>
        if (user) return <Navigate to="/notes" />
         
     return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} >
            <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
            <input className="w-full border px-3 py-2 rounded" placeholder="password" value ={form .password} onChange={(e)=>setForm({...form,password: e.target.value})} />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type ="submit" >Login</button>

        </form>
        </div> 
     )
}
export default Login;