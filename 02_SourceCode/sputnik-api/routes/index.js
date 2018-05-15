'use strict'

const express = require('express');
const productoCtrl = require('../controllers/productoCtrl');
const usuarioCtrl = require('../controllers/usuarioCtrl');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/producto', auth, productoCtrl.getProductos);
api.get('/producto/:productoId', productoCtrl.getProducto);
api.post('/producto', productoCtrl.saveProducto);
api.put('/producto/:productoId', productoCtrl.updateProducto);
api.delete('/producto/:productoId', productoCtrl.deleteProducto);
api.post('/signup', usuarioCtrl.signUp);
api.post('/login', usuarioCtrl.login);
api.get('/private', auth, (req, res) => {
    res.status(200).send({mensaje: `Tienes acceso`})
});

module.exports = api;