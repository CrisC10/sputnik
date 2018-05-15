'use strict';

const mongoose = require('mongoose');
const service = require('../services');
const Usuario = require('../models/usuario');
const Rol = require('../models/roles');

function signUp(req, res) {
    const usuario = new Usuario({
        id_usuario: req.body.id_usuario,
        username: req.body.username,
        nombre_completo: req.body.nombre_completo,
        email: req.body.email
    });

    usuario.save((err) => {
        if (err) return res.status(500).send({mensaje: `Error al crear el usuario: ${err}`});

        return res.status(201).send({token: service.createToken(usuario)})
    })
}

function login(req, res) {
    Usuario.find({username: req.body.username}, (err, usuario) => {
        if (err) return res.status(500).send({mensaje: `${err}`});
        if (!usuario) return res.status(404).send({mensaje: `No existe el usuario`});

        req.user = usuario;
        res.status(200).send({
            mensaje: `Te has logueado correctamente`,
            token: service.createToken(usuario)
        })
    })
}

function asignaUsuarioRol(req, res) {
    var idUsuario = req.params.id_usuario;
    var idRol = req.params.id_rol;

    Usuario.find({id_usuario: idUsuario}, (err, usuario) => {
        if (err)
            return res.status(500).send({mensaje: `${err}`});

        if (!usuario)
            return res.status(404).send({mensaje: `No existe el usuario`});

        Rol.find({id_rol: idRol}, (err, rol) => {
            if (err)
                return res.status(500).send({mensaje: `${err}`});

            if (!rol)
                return res.status(404).send({mensaje: `No existe el rol`});


            // Usuario.update({id_usuario: idUsuario}, {'roles.id_rol': idRol});

            // Usuario.findByIdAndUpdate("5afb687480703038ecdd72e4", {$set: {'roles.id_rol': idRol}}, function (err, doc) {
            //     console.log(doc);
            // });

            Usuario.findOneAndUpdate({id_usuario: idUsuario},roles.id_rol({id_rol:idRol}), {new: true}, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);
            });

            res.status(200).send();

            // usuario.add.roles(rol);
            //
            // //HACIENDO EL UPDATE
            // Usuario.findByIdAndUpdate(idUsuario, usuario, (err, usuarioConRol) => {
            //     if (err)
            //         return res.status(500).send({mensaje: `Error al asignar el rol al usuario : ${err}`});
            //     if (!usuarioConRol)
            //         return res.status(404).status({mensaje: `El usuario no existe`});
            //
            //     res.status(200).send({usuario: usuario})
            // })
        })
    })
}

module.exports = {
    signUp,
    login,
    asignaUsuarioRol
};