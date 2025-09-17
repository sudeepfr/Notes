import axios from 'axios';
const NoteList = ({ notes, refreshNotes,setEditingNote }) => {

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:3000/api/notes/${id}`)
        refreshNotes();
    }
    return (
        <div className='space-y-4'>
            {notes.map((note) => (
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