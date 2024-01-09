const express = require('express');

const response = require('../network/response');
const Storage = require('../storage/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table/', insert);
router.put('/:table/:id', upsert);

// Operaciones directas a la DB, sin preocuparnos de construir las DB denuevo, ni que le tenemos que pasar

async function list(req, res, next) {
    // return await Storage.list(req.params.table);
    const datos = await Storage.list(req.params.table);
    response.success(req, res, datos, 204);
}

async function get(req, res, next) {
    const datos = await Storage.get(req.params.table, req.params.id);
    response.success(req, res, datos, 204);
}

async function insert(req, res, next) {
    const datos = await Storage.insert(req.params.table, req.body);
    response.success(req, res, datos, 204);
}

async function upsert(req, res, next) {
    const datos = await Storage.upsert(req.params.table, req.body);
    response.success(req, res, datos, 204);
}

module.exports = router;