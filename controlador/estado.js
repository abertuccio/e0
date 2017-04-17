var devQuerys = require('../querys/devQuerys');
var ipQuerys = require('../querys/ipQuerys');
var conf = require('../conf/conf');

var estado = function(ip, res, query, next) {

	//EJEMPLO INSERCION DEV	
	//var newDev = devQuerys.ingresamosDev("A1", "1", null);

    //Buscamos dispositivo
	var getDev = devQuerys.getDev(query.h);

	getDev.exec(function(err, ddev) {

		if (ddev == null) {
			//Bloqueamos la ip
			next('No existe dispositivo');
		}
		else {

			var cantidad = ipQuerys.existeIp(ip).cantidad;

			//Solo peticiones exitosas
			if (ddev.estado != 4 && ddev.estado != 3) {

				//Ip de confianza. Se ejecuta una sola vez
				if (cantidad >= conf.reqConfianza) {
					//Esto va a hacer que entre por estadoRapido
					devQuerys.updDev(query.h, ip);

				}
				//Menos de reqConfianza solo sumamos
				else {
					console.log('ESTADO: Se aumentan la cantidad de peticiones');
					var actCant = ipQuerys.actCantidad(ip, cantidad);
					actCant.exec();
				}

			}


			//Devolvemos el estado del dispositivo	
			console.log('ESTADO: La peticion fue correcta.');
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.write(ddev.estado.toString());
			res.end();
		}

	});

}

module.exports.estado = estado;