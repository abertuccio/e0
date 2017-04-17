var mongoose = require('mongoose');
var usuario = new mongoose.Schema({
    ip: 'string',
    email: 'string',
    pass: 'string',
    random: 'string'
});

exports.usuario = usuario;
