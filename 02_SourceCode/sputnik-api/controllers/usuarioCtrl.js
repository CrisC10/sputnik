'use strict';

const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const service = require('../services');

function signUp(req, res) {
    const usuario = new Usuario({
        email: req.body.email,
        username: req.body.username
    });

    usuario.save((err) => {
        if (err) return res.status(500).send({mensaje: `Error al crear el usuario: ${err}`});

        return res.status(201).send({token: service.createToken(usuario)})
    })
}

function signIn(req, res) {
    Usuario.find({email: req.body.email}, (err, usuario) => {
        if (err) return res.status(500).send({mensaje: `${err}`});
        if (!usuario) return res.status(404).send({mensaje: `No existe el usuario`});

        req.user = usuario;
        res.status(200).send({
            mensaje: `Te has logueado correctamente`,
            token: service.createToken(usuario)
        })
    })
}

module.exports = {
    signUp,
    signIn
};