'use strict';

const Rol = require('../models/roles');

function saveRol(req, res){
    const rol = new Rol({
        id_rol: req.body.id_rol,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion
    });

    rol.save((err) => {
        if (err) return res.status(500).send({mensaje: `Error al crear el rol: ${err}`});

        return res.status(201).send()
    })
}

module.exports = {
    saveRol
};