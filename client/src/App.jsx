import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import axios from 'axios';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [editingNote ,setEditingNote]=useState(null);
    const fetchNotes = async () => {
        const res = await axios.get(("http://localhost:3000/api/notes"));
        setNotes(res.data);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6" >
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Notes App
                </h1>
                <NoteForm 
                refreshNotes={fetchNotes}
                editingNote={editingNote}
                setEditingNote={setEditingNote} 
                />
                <NoteList 
                notes={notes} 
                refreshNotes={fetchNotes} 
                setEditingNote={setEditingNote}
                />
            </div>
        </div>
    );
}

export default App;