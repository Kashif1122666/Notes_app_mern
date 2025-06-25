import express from 'express';
import Note from '../models/Note.js';
import { verifyToken } from '../middleware/auth.js';
import { deleteNote, getNotes, postNote, updateNote } from '../controllers/notesController.js';
const router = express.Router();

router.use(verifyToken);

router.post('/', postNote);

router.get('/', getNotes);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

export default router;
