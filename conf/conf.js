if (typeof(process.env.OPENSHIFT_NODEJS_IP) != 'undefined') {

    var ip = process.env.OPENSHIFT_NODEJS_IP;
    var puerto = process.env.OPENSHIFT_NODEJS_PORT;
    var strConexion = 'mongodb://admin:KVUdyeALvCgi@'+ process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/e0';
    
}
else {
    
    var ip = process.env.IP;
    var puerto = process.env.PORT;
    var strConexion = process.env.IP + ':27017/E';
}

var conf = {
    ip: ip,
    puerto: puerto,
    reqConfianza: 432000, // mas de 5 días.
    antiguedadReq: 90000000000, //5000 en produccion
    strConexion: strConexion, //local/cloud localhost:27017/E
    penalizacion: 0, //1 en produccion 0 en desarrollo
    intervalo: 900 //Intervalo entre request de la misma ip
}

module.exports.conf = conf;