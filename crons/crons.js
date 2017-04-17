var CronJob = require('cron').CronJob;
var dev = require('../querys/devQuerys');


var actIpConf = new CronJob('0 0 0 1,10,20 * *', function() {

    dev.updAllDev();

}, null, true, 'America/Buenos_Aires');

module.exports.actIpConf = actIpConf;
