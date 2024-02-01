// const storage = require('../../../storage/mysql');    // Esto lo comentamos ya que estaremos usando el storage de nuestra base de datos remota que llevamos a un microservicio, linea de abajo
// const storage = require('../../../mysql/remote-mysql.js'); // Llamamos a la DB Remota que tenemos en n microservicio
const ctrl = require('./controller.js');
const config = require('../../../config.js');
let storage, cache;

if (config.remoteDB === true) {
    storage = require('../../../storage/remote-mysql.js');
    cache = require("../../../storage/remote-cache.js");
} else {
    storage = require('../../../storage/mysql');
    cache = require("../../../storage/redis");
}



module.exports = ctrl(storage, cache);