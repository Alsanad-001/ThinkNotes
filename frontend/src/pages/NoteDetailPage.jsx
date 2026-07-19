import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Save, Trash2, Sparkles } from "lucide-react";
import api from "../lib/axios";

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setSummary(res.data.summary || "");
      } catch (error) {
        console.error("Error fetching note", error);
        toast.error("Could not load this note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put(`/notes/${id}`, { title, content });
      setSummary(res.data.summary || "");
      toast.success("Note updated!");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex justify-center items-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="btn btn-ghost btn-sm mb-6">
          <ArrowLeft className="size-4" />
          Back to notes
        </Link>

        <form onSubmit={handleSave} className="bg-base-200 p-6 rounded-lg shadow-md border border-base-300">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="input input-bordered w-full mb-4 text-lg font-bold"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Content"
            className="textarea textarea-bordered w-full mb-4"
            rows="8"
          />

          {summary && (
            <div className="mb-4 flex gap-2 items-start bg-base-300/60 rounded-md p-3 text-sm">
              <Sparkles className="size-4 text-secondary shrink-0 mt-0.5" />
              <p className="text-base-content/70 italic">{summary}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-outline btn-error"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
