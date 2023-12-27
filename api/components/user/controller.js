// Debe tener acceso a network

const TABLA = 'user';
const ID = '2';


module.exports = function(injectedStorage) {

    // Le decimos que estaremos usando la DB que le inyerctamos en el index.js del usuario
    let storage = injectedStorage;

    // Si no viene alguna DB inyectada, o viene algun valor no valido, usamos directamente nuestra DB dummy
    if (!storage) {
        storage = require('../../../storage/dummy');
    }

    // Metimos aqui en el export estas funciones que hace la DB, para que tome la DB que le inyectamos
    function list() {
        return storage.list(TABLA);
    }
    
    function get() {
        return storage.get(TABLA, ID);
    }

    // Devolvemos los metodos como lo haciamos antes
    return {
        list,
        get,
    }

}

/* module.exports = {
    list,
    get
} */