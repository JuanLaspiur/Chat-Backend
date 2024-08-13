const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Nombre es obligatorio'],
  },
  lastname: {
    type: String,
    required: [true, 'Apellido es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  }
});

module.exports = model('User', userSchema);
