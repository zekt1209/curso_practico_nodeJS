const express = require("express");
// Creates a new router object.
const router = express.Router();

// Añadir el middleware de seguridad que hemos creado
const secure = require("./secure");

// Llamamos al Response donde manejamos mensajes de exito o error de las peticiones a esta ruta
const response = require("../../../network/response");

// Lo cambiamos a index, ya que ahi devolvemos el controlador en formade funcion (con todos los metodos de la DB)
const Controller = require("./index");

// Usando express, esta la posibilidad de capturar los parametros enviados por el body con la linea 13
router.use(express.json());

// Creamos las diferentes endpoints para el componete "user"
router.get("/", list);
router.get("/:id", get);
router.post("/follow/:id", secure("follow"), follow);
router.get("/:id/following", following);
router.post("/", upsert);
router.put("/", secure("update"), upsert);
router.delete("/:id", remove);

// List
function list(req, res, next) {
    // v 1.0
    /*     res.send('Todo funciona bien !')
    response.success(req, res, 'Todo correcto! ', 200); */

    // v 2.0
    /*     const lista = Controller.list();
    response.success(req, res, lista, 200); */

    // v 3.0
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

// Get
function get(req, res, next) {
    // res.send('Todo funciona bien !')
    // response.success(req, res, 'Todo correcto! ', 200);

    // v 2.0
    /*     const data = Controller.get(req.params.id);
    response.success(req, res, data, 200); */

    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

// Upsert
function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

// Remove
function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, `El usuario con id: ${req.params.id} Se elimino correctamente`, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

// Follow
function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

// Devuelve los usuarios que esta siguiendo el usuario con el ID que le indiquemos
function following(req, res, next) {
    // Tenemos que mandarle el ID del usuario del que queremos consultar a la gente que sigue
    return Controller.following(req.params.id)
        .then((data) => {
            return response.success(req, res, data, 203);
        })
        .catch(next);
} 

module.exports = router;
