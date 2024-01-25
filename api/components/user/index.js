// const storage = require('../../../storage/mysql');    // Esto lo comentamos ya que estaremos usando el storage de nuestra base de datos remota que llevamos a un microservicio, linea de abajo
// const storage = require('../../../mysql/remote-mysql.js'); // Llamamos a la DB Remota que tenemos en n microservicio
const ctrl = require('./controller.js');
const config = require('../../../config.js');
let storage;

if (config.remoteDB === true) {
    storage = require('../../../mysql/remote-mysql.js');
} else {
    storage = require('../../../storage/mysql');
}



module.exports = ctrl(storage);