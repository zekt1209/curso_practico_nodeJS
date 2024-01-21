const express = require('express');

const response = require('../network/response');
const Storage = require('../storage/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table/:id', upsert);
router.delete('/:table/:id', remove);

// Operaciones directas a la DB, sin preocuparnos de construir las DB denuevo, ni que le tenemos que pasar

async function list(req, res, next) {
    try {
        // return await Storage.list(req.params.table);
        const datos = await Storage.list(req.params.table);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en funcion list del microservicio de mysql, error para el dev: ' + err);
    }
}

async function get(req, res, next) {
    try {
        const datos = await Storage.get(req.params.table, req.params.id);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en la funcion get del microservicio de mysql, error: ' + err);
    }
}

async function insert(req, res, next) {
    try {
        const datos = await Storage.insert(req.params.table, req.body);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en funcion insert del microservicio de mysql, error para el dev: ' + err);
    }
}

async function upsert(req, res, next) {
    try {
        const datos = await Storage.upsert(req.params.table, req.body);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en funcion upsert del microservicio de mysql, error para el dev: ' + err);
    }
}

async function remove(req, res, next) {
    try {
        const datos = await Storage.remove(req.params.table, req.params.id);
        response.success(req, res, datos, 201);
    } catch (err) {
        console.log('Error en funcion remove del microservicio de mysql, error para el dev: ' + err);
    }
}

module.exports = router;