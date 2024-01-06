// Debe tener acceso a network

const TABLA = "post";

// Le inyectamos la funcion con la db que definimos en index.js
module.exports = function(injectedStorage) {
    let storage = injectedStorage;

    if (!storage) {
        storage = require("../../../storage/dummy");
    }

    function list() {
        return storage.list(TABLA);
    }

    function get(id) {
        return storage.get(TABLA, id);
    }

    function insert(body) {
        // Agregar Validacion de que solo se puede postear si el id del TOKEN del usuario coincide con el id del user

        return storage.insert(TABLA, body);
    }

    function update(body) {
        return storage.update(TABLA, body);
    }

    return {
        list,
        get,
        insert,
        update,
    };

}