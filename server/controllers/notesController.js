
import Note from '../models/Note.js';

export const postNote = async (req, res) => {
  const note = new Note({ ...req.body, userId: req.userId });
  await note.save();
  res.status(201).json(note);
};


export const deleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
}


export const updateNote = async (req, res) => {
  const updated = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
}


export const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
}