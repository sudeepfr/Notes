import { Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectRoutes/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/login';
import Notes from './pages/Notes';


const App = () => { const {user,logout}=useContext(AuthContext);

    return (
       
            <Routes>
                 <nav>
                     
                 </nav>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/notes" element={<ProtectedRoute>
                    <Notes />
                </ProtectedRoute>}
                /> 
                <Route path="*" element={<Login/>}/>
            </Routes>
           
       
    )
}

export default App;