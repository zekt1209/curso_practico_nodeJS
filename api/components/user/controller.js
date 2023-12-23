// Debe tener acceso a network

const storage = require('../../../storage/dummy');

const TABLA = 'location';
const ID = 'S-246801';

function list() {
    return storage.list(TABLA);
}

function get() {
    return storage.get(TABLA, ID);
}

module.exports = {
    list,
    get
}