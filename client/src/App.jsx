import { Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './protectRoutes/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/login';
import Notes from './pages/Notes';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';


const App = () => { 
    const {user,logout}=useContext(AuthContext);
    const navigate=useNavigate();
    console.log(user);
    return (
        <>
         <nav className='flex justify-between items-center bg-blue-600 p-4 text-white'>
                     <h1 className="text-xl font-bold">Notes App</h1> 
                     {user ? (
                        <div>
                        <div className='flex mr-4 space-x-4'>
                        <h1 className="font-bold text-lg">{`Welcome,  ${user.name}`}</h1>
                        <button 
                        onClick={logout} 
                        className='bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100'
                        >Logout</button>
                        </div>
                        </div>
                     ):(
                        <button  onClick={()=>navigate('/register')} 
                        className='bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100'
                        >Register</button>
                     )}
                 </nav>
         
          <div className='p-6'>
            <Routes>  
                <Route path="/" element={user ? <Notes /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/notes" element={<ProtectedRoute>
                    <Notes />
                </ProtectedRoute>}
                /> 
                <Route path="*" element={<Login/>}/>
                
            </Routes>
           </div>
       </> 
    )
}

export default App;