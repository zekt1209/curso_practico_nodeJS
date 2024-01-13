// auth

const express = require("express");
// Creates a new router object.
const router = express.Router();

// Llamamos al Response donde manejamos mensajes de exito o error de las peticiones a esta ruta
const response = require("../../../network/response");

// Lo cambiamos a index, ya que ahi devolvemos el controlador en formade funcion (con todos los metodos de la DB)
const Controller = require("./index");

// Usando express, esta la posibilidad de capturar los parametros enviados por el body con la linea 13
router.use(express.json());

router.post("/login", function (req, res, next) {
    Controller.login(req.body.username, req.body.password)
        .then((token) => {
            response.success(req, res, token, 200);
        })
        .catch((err) => {
            console.log(err);
            response.error(req, res, 'Informacion Invalida funcion Login/network', 400);
        });
    // .catch(next);
});

module.exports = router;
