import Note from "../models/Note.js";
import { generateSummary } from "../lib/ai.js";

export const getAllNotes = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Note.countDocuments(query);

    res.status(200).json({ notes, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const summary = await generateSummary(content);
    const note = new Note({ title, content, summary: summary || "" });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const summary = await generateSummary(content);
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, ...(summary && { summary }) },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Standalone endpoint: get a summary preview without saving
export const summarizeNote = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const summary = await generateSummary(content);
    if (!summary) return res.status(500).json({ message: "Failed to generate summary" });

    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};