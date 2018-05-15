'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacePartidoSchema = Schema({
    id_fase: Number,
    codigo: String,
    descripcion: String,
    partidos: [
        {
            id_partido: Number,
            pais_local: {
                id_pais: Number,
                score: Number,
                ganador: Boolean
            },
            pais_visita: {
                id_pais: Number,
                score: Number,
                ganador: Boolean
            }
        }
    ],
    detalles_apuestas_generales:[
        {
            id_detalle_apuesta_general: Number
        }
    ]
});

module.exports = mongoose.model('FacePartido', FacePartidoSchema);