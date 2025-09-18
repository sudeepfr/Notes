import axios from 'axios';
import { useState } from 'react';
import toast from "react-hot-toast";
const NoteList = ({ notes, refreshNotes,setEditingNote }) => {
     const [search,setSearch]=useState("");
     const [sort,setSort]=useState("all");

    const deleteNote = async (id) => {
       const res = await axios.delete(`http://localhost:3000/api/notes/${id}`)
       if (res.data.success){
         toast.success("Note deleted");
       }
        refreshNotes();
    }
    
    const filterNotes=notes.
    filter((note)=>note.title.toLowerCase().includes(search.toLowerCase()) ||note.description.toLowerCase().includes(search.toLowerCase()));
      
     if(sort==="latest"){
         filterNotes.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
     }
     else if (sort==="oldest"){
         filterNotes.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
     }
    return (
        <div className='space-y-4'>
            <input type="text" placeholder='search notes..'  value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full px-3 py-2 border rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"/>
             
            <select onChange={(e)=>setSort(e.target.value)}>
                <option value="all">All</option>
                <option value="latest">Latest</option>
                <option value="oldest">oldest</option>
            </select>

            
            {filterNotes.map((note) => (
                <div className='p-4 bg-gray-50 border rounded-lg shadow  overflow-hidden min-w-0' key={note._id}>
                    <h2 className='font-semibold text-lg break-words'>{note.title}</h2>
                    <p className='text-gray-600 overflow-hidden break-words'>{note.description}</p>
                    <h1>Created: {new Date(note.createdAt).toLocaleString()}</h1>
                    <button
                        onClick={() => setEditingNote(note)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                    >
                        Edit
                    </button>
                    <button className=' ml-4 bg-red-500  rounded-lg px-3 py-1 cursor-pointer hover:bg-red-600 transition' onClick={() => deleteNote(note._id)}>Delete</button>
                </div>
            ))}
         
        </div>
    )
}
export default NoteList;