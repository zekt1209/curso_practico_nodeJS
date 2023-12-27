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
            response.error(req, res, err, 500);
        })

})

// Get
router.get('/:id', function(req, res, next) {
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
            response.error(req, res, err, 500);
        })
})

module.exports = router;