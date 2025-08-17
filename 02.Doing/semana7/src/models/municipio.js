const mongoose = require ('mongoose');

const MunicipioSchema = new mongoose.Schema({
    nombre:
    {
        type: String,
        required: true,
        maxLenght: 250,
        unique: true
    },
    estadoId:
    {
        // tipo de dato de un objeto de ID de Mongoose
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // Es la referencia al objeto que se está mandando llamar
        // del llamado del type
        ref: 'Estado'
    }
});

const Municipio = mongoose.model('Municipio', MunicipioSchema);

module.exports = Municipio;