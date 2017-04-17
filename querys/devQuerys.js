var mongoose = require('mongoose');
var crypto = require('crypto');
var dev = mongoose.model('dev');


/*INSERCION DE EJEMPLO
var ndev = new dev({ idUsuaurio: '1', hash: 'b06c270be13ef2b75d329e73da06f057ae4ab0a9bba2e26e3cc805867909ce67', ip: '127.0.0.1', tipoDispositivo: 'A1', version: '1', estado: 2 });

ndev.save();*/

var getDev = function(hash) {

	//TDOO: ver que hacer con esto porque falla
	//h A veces es string y a veces es un objet o no se que.

	var query = dev.findOne({
		hash: hash
	});
	return query;

}


var updAllDev = function() {

	var query = dev.update({
		//Todos los dev
	}, {
		ip: ''
	}, {
		multi:true
	});

	return query;

}


var updDev = function(hash, ip) {

	var query = dev.update({
		hash: hash
	}, {
		ip: ip
	});

	return query;

}

var getDevR = function(hash, ip) {

	var query = dev.findOne({
		hash: hash,
		ip: ip
	});

	return query;
	/* BUSQUEDA DE EJEMPLO
	db.devs.findOne({hash: '265e1640d83a93fd71ec89a0f0a623e62a584200e2d80fc2000d8e3be6185e71', ip:'127.0.0.1'});
	*/
}

//FUNCION NO TESTEADA
var asocDev = function(hash, idUsuario) {

	var hash = toString(hash);

	var query = dev.update({
		hash: hash
	}, {
		idUsuario: idUsuario
	});
	return query;
}

//FUNCION NO TESTEADA
var ingresamosDev = function(tipoDispositivo, version, ip) {

	var dev = mongoose.model('dev'); //TODO Si no lo incluyo aca me tira error, averiguar porque.
	var dia = new Date();
	var ahora = toString(dia.getTime());

	var random = toString(Math.random() * 100);

	var hash = crypto.createHash('sha256').update(ahora + random).digest('hex');

	var dev = new dev({
		idUsuario: '0',
		hash: hash,
		ip: ip,
		tipoDispositivo: tipoDispositivo,
		version: version,
		estado: 2
	});
	dev.save();

	return dev;

}


module.exports.getDev = getDev;
module.exports.getDevR = getDevR;
module.exports.ingresamosDev = ingresamosDev;
module.exports.updDev = updDev;