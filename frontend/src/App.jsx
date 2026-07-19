import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/note/:id" element={<NoteDetailPage />} />
    </Routes>
  );
}
