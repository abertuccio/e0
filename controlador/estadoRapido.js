var devQuerys = require('../querys/devQuerys');

function estadoRapido(ip, res, query, next) {


	var getDevR = devQuerys.getDevR(query.h, ip);

	getDevR.exec(function(err, ddev) {

		if (ddev == null) {
			console.log('ESTADO: No existe Asociacion hash ip, no es motivo de penalizacion');
			//Continuamos con otras validaciones
			next(null);
		}
		else {
			//Devolvemos el estado del dispositivo	
			console.log('El dispositivo existe');
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.write(ddev.estado.toString());
			res.end();
			next(true); //Solo en este caso cambimos la logica del parametro de next.
		}

	});

}

module.exports.estadoRapido = estadoRapido;
