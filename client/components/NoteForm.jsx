import { useEffect, useState } from "react";
import axios from 'axios';
  import toast from "react-hot-toast"; 
const NoteForm=({refreshNotes,editingNote,setEditingNote})=>{
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');

    useEffect(()=>{
         if(editingNote){
             setTitle(editingNote.title);
             setDescription(editingNote.description);
         }
    },[editingNote]);

     const handleSubmit=async()=>{
        //update existing note
          if(editingNote){
            const res = await axios.put(`http://localhost:3000/api/notes/${editingNote._id}`,{
                title,
                description,
            })
            if (res.data.success){
                 toast.success("Updated successfully")
            }
            setEditingNote(null);
            setTitle("");
              setDescription("");
            refreshNotes();

          }else{
             const res= await axios.post("http://localhost:3000/api/notes",{title,description});
              if (res.data.success){
                 toast.success("Added")
            }
              setTitle("");
              setDescription("");
              refreshNotes();
          }
     }
     return (
        <div className="mb-6">
        <input className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring:2 focus:ring-blue-400" value={title } onChange={(e)=>setTitle(e.target.value)} placeholder="Enter the title"/>
        <textarea className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring:2 focus:ring-blue-400" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Enter the description"/>
        <button  className={`w-full ${editingNote ? "bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700"} text-white py-2 rounded-lg transition`} onClick={handleSubmit}>{editingNote ? "Update Note":"Add Note"}</button>
        </div>
     )
}
export default NoteForm;