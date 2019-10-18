const mongoose = require ('mongoose');
const { Schema } = mongoose;

const coursesSchema = new Schema ({
  tipo: String,
  modalidad: String,
  Nombre: String,
  foto: String
});

module.exports = mongoose.model('course', coursesSchema);
