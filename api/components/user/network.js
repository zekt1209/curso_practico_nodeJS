const express = require('express');

// Llamamos al Response donde manejamos mensajes de exito o error de las peticiones a esta ruta
const response = require('../../../network/response');


const Controller = require('./controller');

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
router.get('/userID', function(req, res, next) {
    // res.send('Todo funciona bien !')
    // response.success(req, res, 'Todo correcto! ', 200);
    const data = Controller.get();
    response.success(req, res, data, 200);
})

module.exports = router;