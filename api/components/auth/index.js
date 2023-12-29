const storage = require('../../../storage/dummy');
const ctrl = require('./controller.js');

module.exports = ctrl(storage);