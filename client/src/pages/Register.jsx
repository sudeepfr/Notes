import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register=()=>{
    const {register} =useContext(AuthContext);
    const navigate=useNavigate();
    const [form,setForm]=useState({name:'',email:'',password:''});

    const handleSubmit=async(e)=>{
         e.preventDefault();
         try{
             await register(form.name,form.email,form.password);
             navigate('/notes');
         }catch (error){
             alert(error.response?.data?.message|| 'Register failed');
         }
    }


     return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder="Name" value={form.name} onChange={(e)=>setForm ({...form,name:e.target.value})} />
            <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
            <input type="password" placeholder="passwod" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
            <button type="submit">Register</button>
        </form>
     );
}

export default Register;
