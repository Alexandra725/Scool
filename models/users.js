const mongoose = require ('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
   nombre: {
       type: String,
       require: true
   },
   apellido: {
       type: String,
       require: true
   },
   user: {
       type: String,
       require: true
   },
   email: {
       type: String,
       require: true
   },
   password: {
       type: String,
   },
   courses: '',
   surveyResult: ''
});

module.exports = mongoose.model('user', userSchema);
