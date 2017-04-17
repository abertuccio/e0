var mongoose = require('mongoose');
var ipReq = mongoose.model('ipReq');
var c = require("../conf/conf");

var existeIp = function(ipRequest) {
	console.log("ESTADO: ip del request: " + ipRequest);
	var query = ipReq.findOne({
		ip: ipRequest
	});
	return query;

}

var ingresamosIp = function(ip) {
	var ip = new ipReq({
		ip: ip,
		cantidad: 1,
		penalizacion: 0,
		motivoPenalizacion: '',
		fechaPenalizacion: ''
	});
	ip.save();
	return ip;

}

var actCantidad = function(ip, cant) {

	cant = cant + 1;
	var query = ipReq.update({
		ip: ip
	}, {
		cantidad: cant
	});
	return query;
}

var actPenalizacionIP = function(ip, motivo) {

	console.log('Penalizamos porque ' + motivo);
	//TODO poner penelizacion = 1 en produccion
	var query = ipReq.update({
		ip: ip
	}, {
		penalizacion: c.conf.penalizacion,
		motivoPenalizacion: motivo,
		fechaPenalizacion: new Date()
	});

	return query;

}

module.exports.existeIp = existeIp;
module.exports.ingresamosIp = ingresamosIp;
module.exports.actCantidad = actCantidad;
module.exports.actPenalizacionIP = actPenalizacionIP;
