// Debe tener acceso a network

const nanoid = require("nanoid");
const auth = require("../auth");
// import nanoid from 'nanoid';

const TABLA = "user";
const ID = "2";

module.exports = function (injectedStorage, injectedCache) {
    // Le decimos que estaremos usando la DB que le inyerctamos en el index.js del usuario
    let storage = injectedStorage;
    let cache = injectedCache;
    
    // Si no viene alguna DB inyectada, o viene algun valor no valido, usamos directamente nuestra DB dummy
    if (!storage) {
        storage = require("../../../storage/dummy");
    }
    
    if (!cache) {
        cache = require("../../../storage/dummy");
    }


    // Metimos aqui en el export estas funciones que hace la DB, para que tome la DB que le inyectamos
    async function list() {
        // let users = await cache.list(TABLA);
        let users;
        if (!users) {
            console.log('No estaba en cache, buscando en DB');
            users = storage.list(TABLA);
        } else {
            console.log('Nos traemos datos de cache');
        }

        return users;
    }

    function get(id) {
        return storage.get(TABLA, id);
    }

    async function upsert({ id = null, name = null, username = null, password }) {
        // return storage.upsert(TABLA, data);

        // Validamos que no vengan vacios o nulos la data
        if (!username) {
            return Promise.reject("No se indico el nombre de usuario");
        }

        // Si no viene un id, asignamos uno automaticamente
        if (!id) {
            id = nanoid();
        }

        // Si no viene un name, asignamos uno automaticamente
        if (!name) {
            name = "Unknown";
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
                password: password,
            });
        }

        // -----------------------------------------------------------------------

        // Resolvemos promesa
        return storage.upsert(TABLA, user);
    }

    function remove(id) {
        if (!id) {
            return Promise.reject("No se indico el id del usuario");
        }
        return storage.remove(TABLA, id);
    }

    function follow(fromId, toId) {
        return storage.upsert(`${TABLA}_follow`, {
            user_from: fromId,
            user_to: toId,
        });
    }

    async function following(user) {
        const join = {};
        // Crear objeto de este estilo,
        // Poder crear y traernos los datos del usuario al user_to
        // Esto lo haremos con un JOIN de mysql, en la funcion query de la DB para: Poder traernos los datos del 
        join[TABLA] = 'user_to'; // {user: user_to}
        const query = { user_from: user };

        return await storage.queryArrayList(`${TABLA}_follow`, query, join);
    }

    // Devolvemos los metodos como lo haciamos antes
    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
    };
};

/* module.exports = {
    list,
    get
} */

// lil change