import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Loader2, Sparkles } from "lucide-react";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data.notes || []);
    } catch (error) {
      console.error("Error fetching notes", error);
      toast.error("Could not load notes. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setCreating(true);
    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      toast.success("Note created!");
      fetchNotes();
    } catch (error) {
      console.error("Error creating note", error);
      const message = error.response?.data?.message || "Failed to create note";
      toast.error(message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">ThinkNotes</h1>

        {/* Create Note Form */}
        <form onSubmit={handleCreate} className="mb-10 bg-base-200 p-6 rounded-lg shadow-md border border-base-300">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="input input-bordered w-full mb-4"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Content"
            className="textarea textarea-bordered w-full mb-4"
            rows="3"
          />
          <button type="submit" className="btn btn-primary" disabled={creating}>
            {creating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Generating summary...
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Add Note
              </>
            )}
          </button>
        </form>

        {/* Display Notes */}
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={handleDelete} />
            ))}
            {notes.length === 0 && (
              <p className="text-base-content/50 italic text-center py-10">
                No notes yet. Create one above!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
