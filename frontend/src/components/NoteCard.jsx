import { Link } from "react-router";
import { PenSquare, Trash2, Sparkles } from "lucide-react";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-lg p-5 flex flex-col gap-3 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start gap-3">
        <h2 className="text-lg font-bold text-primary break-words">{note.title}</h2>
        <div className="flex gap-1 shrink-0">
          <Link
            to={`/note/${note._id}`}
            className="btn btn-ghost btn-xs btn-square"
            title="Edit note"
          >
            <PenSquare className="size-4" />
          </Link>
          <button
            onClick={() => onDelete(note._id)}
            className="btn btn-ghost btn-xs btn-square text-error"
            title="Delete note"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <p className="text-base-content/80 whitespace-pre-wrap break-words">{note.content}</p>

      {note.summary && (
        <div className="mt-1 flex gap-2 items-start bg-base-300/60 rounded-md p-3 text-sm">
          <Sparkles className="size-4 text-secondary shrink-0 mt-0.5" />
          <p className="text-base-content/70 italic">{note.summary}</p>
        </div>
      )}

      <p className="text-xs text-base-content/40 mt-1">
        {new Date(note.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
