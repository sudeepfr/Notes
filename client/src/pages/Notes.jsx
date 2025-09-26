import { useState } from "react"
import { useEffect } from "react";
import api from "../api/axios";
const Notes=()=>{
    const [form,setForm]=useState({title:"",description:""});
    const [notes,setNotes]=useState([]);

     const loadNotes=async()=>{
         const res=await api.get(`/api/notes`);
         setNotes(res.data);
     }

     useEffect(()=>{
         loadNotes();
     },[]);

     const addNote=async(e)=>{
         e.preventDefault();
         if (!form.title || !form.description) return;
         await api.post(`/api/notes`,form);
         setForm({title:"",description:""});
         loadNotes();
     }
      const deleteNote=async(id)=>{
         await api.delete(`/api/notes/${id}`);
         loadNotes();
      }

     return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-2xl mx-auto">

            <form onSubmit={addNote} className="space-y-4 bg-white p-6 rounded shadow">
                <input  className="w-full border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value })}/>
                <textarea className="w-full border px-3 py-2 rounded" rows="4" placeholder='Desciption' value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">Add Notes</button>
            </form>

            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {notes.map((note)=>(
                  <div className="bg-gray-100 p-4 rounded shadow flex flex-col space-y-2" key={note._id}>
                     <h3 className="font-bold text-lg">{note.title}</h3>
                     <p className="text-gray-700 mt-1 max-h-20 line-clamp-3">{note.description}</p>
                     <div className="self-start">ijh
                     <button  onClick={()=>deleteNote (note._id)} className="self-start text-white bg-red-500 px-3  py-1 rounded hover:bg-red-600">Delete</button>
                     <button  onClick={()=>updateNote (note._id)} className="self-start text-white bg-yellow-500 px-3 m-2 py-1 rounded hover:bg-yellow-600">Update</button>
                     </div>
                  </div>  
                ))}
            </div>

        </div>
     )
}

export default Notes;