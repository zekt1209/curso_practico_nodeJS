// Debe tener acceso a network

const nanoid = require('nanoid');

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
        // Si no viene un ID, asignamos uno automaticamente
        if (!body.id) {
            body.id = nanoid();
        }
        return storage.insert(TABLA, body);
    }

    function update(body/* {id = null, text = '', user = null} */) {
        // Validaciones para actualizacion de un POST
        // Solo se puede editar un POST si el id del TOKEN del usuario coincide con el id del usuario


        // Si el ID no es encontrado en la DB, lanzar un error

        return storage.update(TABLA, body);
    }

    function remove(id) {
        return storage.remove(TABLA, id);
    }

    async function getByUser(userId) {
        let row = [];

        row = await storage.query(TABLA, {
            user: userId
        })

        if(row.length === 0) {
            return 'El usuario con ese ID no tienen posts aun';
        } else {

            return row;
        }

/*         return storage.query(TABLA, {
            user: userId
        }) */

    }

    return {
        list,
        get,
        insert,
        update,
        remove,
        getByUser,
    };

}