var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Sorteo = require('../models/sorteos');

// ==========================================
// Obtener todos los sorteos
// ==========================================
app.get('/', (req, res, next) => {

       Sorteo.find({}, )
      
        .exec(
            (err, sorteos) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando sorteos',
                        errors: err 
                    });
                }
                
                Sorteo.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        sorteos: sorteos,
                        total: conteo
                    });

                })

            });
});


// ==========================================
// Actualizar sorteo
// ==========================================
app.put('/:id', /*mdAutenticacion.verificaToken,*/ (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Sorteo.findById(id, (err, sorteo) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar sorteo',
                errors: err
            });
        }

        if (!sorteo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El sorteo con el id ' + id + ' no existe',
                errors: { message: 'No existe un sorteo con ese ID' }
            });
        }


        sorteo.nombre = body.nombre;
        sorteo.descripcion = body.descripcion;
        sorteo.limite = body.limite;
        sorteo.fechavence=body.fechavence;
        sorteo.estatus=body.estatus;
        sorteo.monto=body.monto;
        //sorteo.comprados=body.comprados;
        sorteo.porcentaje =body.porcentaje ;
        

        sorteo.save((err, sorteoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar sorteo',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                sorteo: sorteoGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo sorteo
// ==========================================
app.post('/', /*mdAutenticacion.verificaToken,*/ (req, res) => {

    var body = req.body;

    var sorteo = new Sorteo({
        nombre : body.nombre,
        descripcion : body.descripcion,
        limite : body.limite,
        fechavence:body.fechavence,
        monto:body.monto,
        fechacreado:new Date(),
        porcentaje :body.porcentaje 
    });

    sorteo.save((err, sorteoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear sorteo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
           sorteo: sorteoGuardado
        });


    });

});


// ============================================
//   Borrar un medico por el id
// ============================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar medico',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un medico con ese id',
                errors: { message: 'No existe un medico con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });

    });

});


module.exports = app;