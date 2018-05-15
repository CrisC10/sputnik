'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UsuarioSchema = new Schema({
    id_usuario: Number,
    username: String,
    password: {type: String, select: false},
    partidas: [
        {
            id_partida: Number
        }
    ],
    roles: [
        {
            id_rol: Number
        }
    ],
    email: {type: String, unique: true, lowercase: true},
    avatar: String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
});

UsuarioSchema.pre('save', function (next) {
    let usuario = this;
    if (!usuario.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next();

        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) return next(err);

            usuario.password = hash;
            next()
        })
    })
});

UsuarioSchema.methods.gravatar = function () {

    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
};

module.exports = mongoose.model('Usuario', UsuarioSchema);