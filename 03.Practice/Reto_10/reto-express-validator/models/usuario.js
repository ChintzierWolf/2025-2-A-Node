import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  edad: {
    type: Number,
    required: true,
    min: 18,
    max: 99,
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6,
  },
});

export default mongoose.model("Usuario", usuarioSchema);