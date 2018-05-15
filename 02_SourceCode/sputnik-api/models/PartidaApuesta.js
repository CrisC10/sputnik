'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidaApuestaSchema = Schema({
    id_partida: Number,
    descripcion: String,
    id_usuario_admin: Number,
    usuarios_participantes: [{id_usuario_jugador: Number}]
});

module.exports = mongoose.model('PartidaApuesta', PartidaApuestaSchema);