const config = require('../../../config');
const ctrl = require('./controller');
// const storage = require('../../../storage/mysql');

let storage;

if (config.remoteDB === true) {
    storage = require('../../../mysql/remote-mysql.js');
} else {
    storage = require('../../../storage/mysql');
}


module.exports = ctrl(storage);