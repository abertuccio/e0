var ipQuerys = require('../querys/ipQuerys');
var c = require("../conf/conf");

//TODO hacer validaciones bien
var vHash = function(hash) {
	if (!hash) {
		return false;
	}

	return true;

};

var vTimeStamp = function(timeStamp) {
	if (!timeStamp) {
		return false;
	}

	return true;

};

var validaIp = function validaIp(dip, ip, next) {
	var ipQuerys = require('../querys/ipQuerys');

	//ES UNA NUEVA IP	
	if (dip == null) {
		console.log('ESTADO: Es una ip nueva');

		ipQuerys.ingresamosIp(ip);
		next(null);

	} //ES UNA IP CON PETICIONES VIEJAS
	else {
		console.log('ESTADO: Es una vieja ip');
		//SI LA IP TIENE PENALIZACIONES LO SACAMOS E4.	
		var penalizacion = dip.penalizacion;

		if (penalizacion != 0) {
			console.log('ESTADO: Tiene una penalizacion previa');
			next(dip.motivoPenalizacion);
		}
		else {
			//Momento de la ultima insercion	
			var ultimaInsercion = dip._id.getTimestamp().getTime();

			//Si las peticiones son mayores al intervalo propuesto, penalizamos
			//TODO ver porque se lanzan dos peticiones al mismo momento
			var ahora = new Date().getTime();
			if (ultimaInsercion + c.conf.intervalo >= ahora) {
				console.log('ERROR: Peticiones mayores al intervalo admitido');
				ipQuerys.actPenalizacionIP(ip, "Peticiones mayores al intervalo admitido");
			}

			next(null);
		}

	}
}

var validacion = function(res, query, ip, next) {

	var ipQuerys = require('../querys/ipQuerys');

	//VERIFICAMOS SI ES UNA PETICIÓN DE UNA NUEVA IP O NO
	var existeIp = ipQuerys.existeIp(ip);

	existeIp.exec(function(err, dip) {

		validaIp(dip, ip, function(motivo) {
			if (motivo) {
				penalizacionIp(ip, motivo, res);
			}
			else {
				if (vHash(query.h) && vTimeStamp(query.ts)) {
					next(null);
				}
				else {
					penalizacionIp(ip, 'Falta algún parametro', res);
					next('Falta algun parametro');
				}

			}
		});

	});


}

var penalizacionIp = function(ip, motivo, res) {
	var db = require('../querys/conexion');

	var actPen = ipQuerys.actPenalizacionIP(ip, motivo);
	actPen.exec();

	muestraBloqueo(motivo, res)
};

var muestraBloqueo = function(err, res) {
	console.log("ERROR: " + err);
	if (err) {
		res.statusCode = 200;
		res.end('4');
		return true;
	}
	else {
		return false;
	}
}

module.exports.penalizacionIp = penalizacionIp;
module.exports.vHash = vHash;
module.exports.vTimeStamp = vTimeStamp;
module.exports.muestraBloqueo = muestraBloqueo;
module.exports.validacion = validacion;
