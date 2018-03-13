'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = Schema({
    nombre: String,
    imagen: String,
    precio: { type: Number, defauld: 0},
    categoria: { type: String, enum: ['computadora','telefono','accesorio']},
    descripcion: String
})

module.exports =  mongoose.model('Producto',ProductoSchema)