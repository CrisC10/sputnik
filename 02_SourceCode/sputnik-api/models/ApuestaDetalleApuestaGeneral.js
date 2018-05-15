'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApuestaDetalleApuestaGeneralSchema = Schema({
    id_apuesta: Number,
    id_usuario: Number,
    tipo: String,
    id_partida: Number,
    puntos: Number,
    detalle_apuesta_general: [
        {
            id_detalle_apuesta_general: Number,
            fases: [
                {
                    id_fase : Number
                }
            ]
        }
        ]
});

module.exports = mongoose.model('ApuestaDetalleApuestaGeneral', ApuestaDetalleApuestaGeneralSchema);