// Aqui gestionamos los permisos
// Confirmamos que el usuario que quiere realizar el movimiento, tiene permisos para realizar la transaccion, e.j, si el usuario quiere actalizar algun atributo de su perfil, comprobar que sea el, y que no pueda actualizar info de alguien mas

const token = require("../../../token");

// Exportamos un middleware
module.exports = function checkAuth(action) {
    // Action -> Accion que queremos ejecutar (la usaremos en el middleware)

    function middleware(req, res, next) {
        // Posibles acciones que pueden suceder
        // Gestionamos los permisos
        switch (action) {
            case "update":
                // Lo que se tiene que cumplir para que el user pueda hacer un update

                // id del user que hace la peticion
                const owner = req.body.id;

                // Funcion que valida que el que hace la peticion, es el mismo que esta registrado en la DB de auth
                token.check.own(req, owner);
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
};
