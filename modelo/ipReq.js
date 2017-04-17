var mongoose = require('mongoose');
var ipReq = new mongoose.Schema({
    ip: 'string',
    cantidad: 'number',
    penalizacion: 'number',
    motivoPenalizacion: 'string',
    fechaPenalizacion: 'string'
});

exports.ipReq = ipReq;