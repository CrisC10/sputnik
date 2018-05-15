'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = Schema({
    id_rol: Number,
    codigo: String,
    descripcion: String
});

module.exports = mongoose.model('Roles', RolesSchema);