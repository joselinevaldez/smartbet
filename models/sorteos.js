var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sorteoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    imagen: { type: String, required: false },
    descripcion: { type: String, required: [true, 'La descripcion es necesaria']},
    limite: { type: Number, required: true },
    comprados: { type: Number, required: false, default:0},
    porcentaje: { type: Number, required: true },
    monto: { type: Number, required: true },
    fechacreado: { type: Date, required: false },
    fechavence: { type: Date, required: true },
    estatus: { type: String, required: false ,default:"1"}
   
});


module.exports = mongoose.model('Sorteo', sorteoSchema);