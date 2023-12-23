const express = require('express');

const response = require('../../../network/response');
const Controller = require('./controller');

const router = express.Router();

router.get('/', function(req, res, next) {
    // res.send('Todo funciona bien !')
    // response.success(req, res, 'Todo correcto! ', 200);
    const lista = Controller.list();
    response.success(req, res, lista, 200);
})
router.get('/userID', function(req, res, next) {
    // res.send('Todo funciona bien !')
    // response.success(req, res, 'Todo correcto! ', 200);
    const data = Controller.get();
    response.success(req, res, data, 200);
})

module.exports = router;