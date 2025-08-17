const mongoose = require ('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: string,
        required: true,
    },
    edad: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const usuario = mongoose.Model('Usuario', UsuarioSchema);

module.exports = Usuario;