const storage = require('../../../storage/mysql');
const ctrl = require('./controller.js');

module.exports = ctrl(storage);