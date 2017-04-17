var mongoose = require('mongoose');
var c = require("../conf/conf");

mongoose.connect(c.conf.strConexion);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Conectamos a la base correctamente');
});

//Cargamos Modelos
ipReqSchema = require('../modelo/ipReq').ipReq;
devSchema = require('../modelo/dispositivos').dispositivo;

//Iniciamos Modelos
mongoose.model('ipReq', ipReqSchema);
mongoose.model('dev', devSchema);

exports.mongoose = mongoose;
