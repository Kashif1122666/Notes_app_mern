import { useState } from "react";

export default function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    setSuccess("");

    try {
      await onAddNote({ title, content });
      setSuccess("Note added successfully ✅");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Add a New Note</h2>

        {success && (
          <div className="mb-4 p-2 bg-green-500/70 text-white rounded-md text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter note title"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter note content"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 font-semibold rounded-md transition-all duration-200 ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Adding...
              </span>
            ) : (
              "➕ Add Note"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
