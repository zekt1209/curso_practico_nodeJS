const express = require("express");
// Creates a new router object.
const router = express.Router();

// Llamamos al Response donde manejamos mensajes de exito o error de las peticiones a esta ruta
const response = require("../../../network/response");

// Lo cambiamos a index, ya que ahi devolvemos el controlador en formade funcion (con todos los metodos de la DB)
const Controller = require("./index");

// Usando express, esta la posibilidad de capturar los parametros enviados por el body con la linea 13
router.use(express.json());

// ------------- endpoints ----------------------------------
// Creamos las diferentes endpoints para el componete "user"
router.get("/", list);
router.get("/:id", get);
router.post("/", insert);
router.put("/:id", update);

// RETO de clase crear el resto de funciones para poder 
// - añadir un post
// - leer un post por id
// - editar un post

// ----------------------------------------------------------

// ------------- Functions ----------------------------------
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 203);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(data => {
            response.success(req, res, data, 203);
        })
        .catch(next);
}

function insert(req, res, next) {
    Controller.insert(req.body)
        .then(post => {
            response.success(req, res, post, 203);
        })
        .catch(next);
    }

function update(req, res, next) {
    Controller.update(req.body)
        .then(post => {
            response.success(req, res, post, 203);
        })
        .catch(next);
}


// ----------------------------------------------------------

module.exports = router;