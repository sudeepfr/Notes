import { useState } from "react"
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
const Notes=()=>{
    const {user,logout}=useContext(AuthContext)
    const [form,setForm]=useState({title:"",description:""});
    const [notes,setNotes]=useState([]);

     const loadNotes=async()=>{
         const res=await api.get("/api/notes",{ withCredentials: true });
         setNotes(res.data);
     }

     useEffect(()=>{
         loadNotes();
     },[]);

     const addNote=async()=>{
         e.preventDefault()
         if (!form.title || !form.description) return;
         await api.post('/api/notes',form,{ withCredentials: true });
         setForm({title:"",description:""});
         loadNotes();
     }
      const deleteNote=async(id)=>{
         await api.delete(`/api/notes/${id}`, { withCredentials: true });
         loadNotes();
      }

     return (
        <div>
            <div className="max-w-2xl mx-auto">

            <form onSubmit={addNote} className="space-y-4 bg-white p-6 rounded shadow">
                <input  className="w-full border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value })}/>
                <textarea className="w-full border px-3 py-2 rounded" rows="4" placeholder='Desciption' value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">Add Notes</button>
            </form>

            </div>
            <ul className="mt-6 space-y-4">
                {notes.map((note)=>(
                  <li className="bg-gray-100 p-4 rounded shadow flex justify-between items-start" key={note._id}>

                    <div>
                     <h3 className="font-bold text-lg">{note.title}</h3>
                     <p className="text-gray-700 mt-1">{note.description}</p>
                    </div>

                    <button  onClick={()=>deleteNote (note._id)} className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                  </li>  
                ))}
            </ul>
        </div>
     )
}

export default Notes;