import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
}, { timestamps: true });
export default mongoose.model('Note', noteSchema);
