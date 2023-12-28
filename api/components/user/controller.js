// Debe tener acceso a network

const nanoid = require('nanoid');
// import nanoid from 'nanoid';

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
    
    function get(id) {
        return storage.get(TABLA, id);
    }

    function upsert({id = null, name = null}) {
        // return storage.upsert(TABLA, data);

        // Validamos que no vengan vacios o nulos la data
        if (!name) {
            return Promise.reject('No se indico el nombre');
        }

        if (!id) {
            id = nanoid();
        }

        // Construimos el objeto a insertar con la data que nos viene
        const user = {
            id,
            name
        };

        // Resolvemos promesa
        return storage.upsert(TABLA, user);

    }

    function remove(id) {
        return storage.remove(TABLA, id);
    }

    // Devolvemos los metodos como lo haciamos antes
    return {
        list,
        get,
        upsert,
        remove
    }

}

/* module.exports = {
    list,
    get
} */