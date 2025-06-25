const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">📝 Your Notes</h1>

      {notes.length === 0 ? (
        <p className="text-center text-white/70">No notes yet. Add your first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20"
            >
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-white/80 mb-4">{note.content}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => onEditNote(note)}
                  className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDeleteNote(note._id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
