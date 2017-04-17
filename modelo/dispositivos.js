var mongoose = require('mongoose');
var dispositivo = new mongoose.Schema({
    idUsuaurio: 'string',
    hash: 'string',
    ip: 'string',
    tipoDispositivo: 'string',
    version: 'string',
    estado: 'number'
});

exports.dispositivo = dispositivo;
