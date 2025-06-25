import { useState } from 'react';
import axios from 'axios';

const EditNoteModal = ({ note, onClose, onUpdateNote }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:5000/api/notes/${note._id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      onUpdateNote(note._id, { title, content });
    } catch (err) {
      console.error("Error updating note", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white/10 border border-white/20 text-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">✏️ Edit Note</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Title"
          />
          <textarea
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-white/20 text-white placeholder-white/60 border border-white/30 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Content"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className={`px-4 py-1 rounded text-white ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
