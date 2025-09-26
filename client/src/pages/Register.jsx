import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register,registered,setRegistered,setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      setRegistered(true);
    } catch (error) {
      console.log(error);
    }
  }


  return(
    registered ? (
      <div className="mt-4 text-center">
        <p>Registration successful! Please login to continue.</p>
        <button
          onClick={() =>{
            setUser(null);
            setRegistered(false);
             navigate("/login")
          } }
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    ) : (
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full border px-3 py-2 rounded" type="password" placeholder="passwod" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">Sign Up</button>
        </form>
      </div>
    )
    );
  
}

export default Register;
