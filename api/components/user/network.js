const express = require('express');

// Llamamos al Response donde manejamos mensajes de exito o error de las peticiones a esta ruta
const response = require('../../../network/response');

// Lo cambiamos a index, ya que ahi devolvemos el controlador en formade funcion (con todos los metodos de la DB)
const Controller = require('./index')

// Creates a new router object.
const router = express.Router();

// Creamos las diferentes endpoints para el componete "user"

// Rise
router.get('/', function(req, res, next) {
    // res.send('Todo funciona bien !')
    // response.success(req, res, 'Todo correcto! ', 200);
    const lista = Controller.list();
    response.success(req, res, lista, 200);
})

// Get
router.get('/:id', function(req, res, next) {
    // res.send('Todo funciona bien !')
    // response.success(req, res, 'Todo correcto! ', 200);
    const data = Controller.get(req.params.id);
    response.success(req, res, data, 200);
})

module.exports = router;