'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaisesSchema = Schema({
    id_pais: Number,
    codigo: String,
    descripcion: String
});

module.exports = mongoose.model('Paises', PaisesSchema);