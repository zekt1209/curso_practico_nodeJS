// Debe tener acceso a network

const bcrypt = require('bcrypt');
const token = require('../../../token/index');
// Modulo para gestion avanzada de errores
const error = require("../../../utils/error");

const TABLA = 'auth';

module.exports = function(injectedStorage) {

    // Le decimos que estaremos usando la DB que le inyerctamos en el index.js del usuario
    let storage = injectedStorage;

    // Si no viene alguna DB inyectada, o viene algun valor no valido, usamos directamente nuestra DB dummy
    if (!storage) {
        storage = require('../../../storage/dummy');
    }

    async function login(username, password) {
        // Hacemos un query a la base de datos para sacar el username y password
        const data = await storage.query(TABLA, { username: username })
        // Encadenamos promess para en ves de devolver true o false si la contraseña hasheada es la que tenemos en la base de datos, nos devuelva el token
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token;
                    // return 'TOKEN';
                    return token.sign(data);
                } else {
                    throw error('Informacion invalida', 401);
                }
            })

        // return data;
    }

    // Esta funcion se ejecuta en el controlador de usuario, para mandar la contraseña desde ahi
    async function upsert(data) {

        // Crea un id
        const authData = {
            id: data.id,
        }

        // Estos datos los asignamos separados para que en caso de que solo se quiera actualizar cierta data, sea posible

        // Si hay un username -> lo actualiza
        if (data.username) {
            authData.username = data.username;
        }

        // Si hay un password -> lo actualiza
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        // Resuelve promesa, devuelve la funcion a base de datos que sabemos que va a ser una promesa
        return storage.upsert(TABLA, authData);

    }

    // Devolvemos los metodos como lo haciamos antes
    return {
        upsert,
        login,
    }

}
