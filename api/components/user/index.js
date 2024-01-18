// const storage = require('../../../storage/mysql');    // Esto lo comentamos ya que estaremos usando el storage de nuestra base de datos remota que llevamos a un microservicio, linea de abajo
const storage = require('../../../mysql/remote-mysql.js'); // Llamamos a la DB Remota que tenemos en n microservicio
const ctrl = require('./controller.js');

module.exports = ctrl(storage);