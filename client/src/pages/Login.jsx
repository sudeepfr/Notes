import {useState,useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const [form,setForm]=useState({email:'',password:''});
    const {login}=useContext(AuthContext);
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

     return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
            <input placeholder="password" value ={form .password} onChange={(e)=>setForm({...form,password: e.target.value})} />
            <button type ="submit" >Login</button>

        </form>
     )
}
export default Login;