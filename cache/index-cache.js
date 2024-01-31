const express = require('express');
const router = require('./network');
const config = require('../config');


const app = express();

// Forma estandar para comunicarnos con nuestra API
app.use(express.json());


// Rutas / Endpoints
app.use('/', router);

// Levantar el servidor
app.listen(config.cacheService.port, () => {
    console.log(`cache Redis Service ready on: http://localhost:${config.cacheService.port}`);
})
