const express = require('express');

const response = require('../network/response');
const Storage = require('../storage/redis');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table/:id', upsert);

// Operaciones directas a la DB, sin preocuparnos de construir las DB denuevo, ni que le tenemos que pasar

async function list(req, res, next) {
    try {
        // return await Storage.list(req.params.table);
        const datos = await Storage.list(req.params.table);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en funcion list del microservicio de redis, error para el dev: ' + err);
    }
}

async function get(req, res, next) {
    try {
        const datos = await Storage.get(req.params.table, req.params.id);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en la funcion get del microservicio de redis, error: ' + err);
    }
}

async function upsert(req, res, next) {
    try {
        const datos = await Storage.upsert(req.params.table, req.body);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en funcion upsert del microservicio de redis, error para el dev: ' + err);
    }
}

module.exports = router;