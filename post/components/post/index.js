const storage = require('../../../storage/mysql');
const ctrl = require('./controller');

module.exports = ctrl(storage);