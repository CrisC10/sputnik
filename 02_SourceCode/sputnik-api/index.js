'use strict';
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

//Conexion a la Base de Datos
mongoose.connect(config.db, function (err) {
    if (err) {
        return console.log(`Error al conectar a la Base de Datos : ${err}`)
    }
    console.log('Conexion a la base de datos establecida..');

    //Creando el servidor
    app.listen(config.port, () => {
        console.log(`sputnik running in http://localhost:${config.port} `)
    })
});


