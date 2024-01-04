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

    return {
        list,
    };

}