'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuntosPaisFaceGruposSchema = Schema({
    id_puntos_pais_fase_grupos: Number,
    id_fase: Number,
    id_pais: Number,
    puntos: Number,
    gol_diferencia: Number
});

module.exports = mongoose.model('PuntosPaisFaceGrupos', PuntosPaisFaceGruposSchema);