import { useState } from "react"
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
const Notes=()=>{
    const {user,logout}=useContext(AuthContext)
    const [form,setForm]=useState({title:'',description:''});
    const [notes,setNotes]=useState([]);

     const loadNotes=async()=>{
         const res=await api.get("/api/notes");
         setNotes(res.data);
     }

     useEffect(()=>{
         loadNotes();
     },[]);

     const addNote=async()=>{
         e.preventDefault();
         await api.post('/api/notes',form);
         setForm({title:'',description:''});
         loadNotes();
     }
      const deleteNote=async(id)=>{
         await api.delete(`/api/notes${id}`);
         loadNotes();
      }

     return (
        <div>
             

            <form onSubmit={addNote}>
                <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value })}/>
                <textarea placeholder='Desciption' onChange={e=>setForm({...form,description:e.target.value})}/>
                <button type="submit">Add Notes</button>
            </form>

            <ul>
                {notes.map((note)=>(
                  <div key={note._id}>
                    <b>{note.title}</b>
                    <p>{note.description}</p>
                    <button onClick={()=>deleteNote(note._id)}>Delete</button>
                  </div>  
                ))}
            </ul>
        </div>
     )
}

export default Notes;