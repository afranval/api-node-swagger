import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {type: String, required: [true, 'Name required']},
  description: String,
  userId: String,
  date:{type: Date, default: Date.now},
  active: {type: Boolean, default: true}
});

// Convertir a modelo
const Note = mongoose.model('Note', noteSchema);

export default Note;