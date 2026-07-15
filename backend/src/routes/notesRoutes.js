import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  summarizeNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.post("/summarize", summarizeNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;