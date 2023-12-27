const storage = require('../../../storage/dummy');
const ctrl = require('./controller');

module.exports = ctrl(storage);