var http = require('http');
var c = require("./conf/conf");
var db = require('./querys/conexion');
var er = require('./controlador/estadoRapido');
var e = require('./controlador/estado');
var v = require('./validaciones/validacionParametros.js');
var cronactIpConf = require("./crons/crons.js").actIpConf;


http.createServer(function(req, res) {

	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var ip = req.connection.remoteAddress;
	var ahora = new Date().getTime();

	//La peticion no puede tener mas de 5 segundos de antiguedad
	//No bloqueamos si no cumple esta condicion, porque puede ser un ataque para bloquer la ip de otra persona.
	if (parseInt(query.ts) + parseInt(c.conf.antiguedadReq) > parseInt(ahora)) {

		//Devolvemos el estado en ip de confianza

		//No bloqueamos si no cummple esta condicion, por hay hilos fantasmas, y no significan un ataque.
		if (query.h && query.ts) {

			er.estadoRapido(ip, res, query, function(err) {

				if (!v.muestraBloqueo(err, res)) {
					//Validamos ip, hash, cantidad req, etc.

					v.validacion(res, query, ip, function(err) {

						if (!v.muestraBloqueo(err, res)) {

							//Devolvemos el estado
							e.estado(ip, res, query, function(err) {

								v.muestraBloqueo(err, res);

							})
						}

					});
				}
			});

		}
	}

}).listen(c.conf.puerto, c.conf.ip);
