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

// ----------------------------------------------------------

// ------------- Functions ----------------------------------
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

// ----------------------------------------------------------

module.exports = router;