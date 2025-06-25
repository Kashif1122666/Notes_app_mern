import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import EditNoteModal from '../components/EditNoteModal';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const { token, setToken } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };

    if (token) fetchNotes();
  }, [token]);

  const handleAddNote = async (noteData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/notes', noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/notes/${noteId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes((prev) =>
        prev.map((note) => (note._id === noteId ? res.data : note))
      );
      setEditingNote(null);
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white p-4 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg border border-white/20 backdrop-blur-md bg-opacity-80"
        >
          🔓 Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 mt-8">
        <NoteForm onAddNote={handleAddNote} />
        <NoteList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onEditNote={(note) => setEditingNote(note)}
        />
      </div>

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  );
};

export default Notes;
