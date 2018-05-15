'use strict'

const express = require('express');
const auth = require('../middlewares/auth');
const api = express.Router();

const productoCtrl = require('../controllers/productoCtrl');
const usuarioCtrl = require('../controllers/usuarioCtrl');
const rolCtrl = require('../controllers/rolCtrl');


// PRODUCTO
api.get('/producto', auth, productoCtrl.getProductos);
api.get('/producto/:productoId', productoCtrl.getProducto);
api.post('/producto', productoCtrl.saveProducto);
api.put('/producto/:productoId', productoCtrl.updateProducto);
api.delete('/producto/:productoId', productoCtrl.deleteProducto);

// USUARIO
api.post('/signup', usuarioCtrl.signUp);
api.post('/login', usuarioCtrl.login);
api.get('/private', auth, (req, res) => {
    res.status(200).send({mensaje: `Tienes acceso`})
});
api.post('/usuarios/:id_usuario/roles/:id_rol', usuarioCtrl.asignaUsuarioRol);

// ROLES
api.post('/roles', rolCtrl.saveRol);


module.exports = api;