// Debe tener acceso a network

const nanoid = require('nanoid');
const auth = require('../auth');
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

    async function upsert({id = null, name = null, username = null, password}) {
        // return storage.upsert(TABLA, data);

        // Validamos que no vengan vacios o nulos la data
        if (!username) {
            return Promise.reject('No se indico el nombre de usuario');
        }

        // Si no viene un id, asignamos uno automaticamente
        if (!id) {
            id = nanoid();
        }

        // Si no viene un name, asignamos uno automaticamente
        if (!name) {
            name = 'Unknown';
        }


        // Construimos el objeto a insertar con la data que nos viene
        const user = {
            id,
            name,
            username,
        };

        // ------------------ Llamado a auth -------------------------------------
        // Si nos cambian el password o el username, cambiarlo tambien en la tabla de auth
        if (password || username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: password
            })
        }

        // -----------------------------------------------------------------------

        // Resolvemos promesa
        return storage.upsert(TABLA, user);

    }

    function remove(id) {
        if (!id) {
            return Promise.reject('No se indico el id del usuario');
        }
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