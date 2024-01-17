const express = require('express');
const router = require('./network');
const config = require('../config');


const app = express();

// Forma estandar para comunicarnos con nuestra API
app.use(express.json());


// Rutas / Endpoints
app.use('/', router);

// Levantar el servidor
app.listen(config.mysqlService.port, () => {
    console.log(`mysql Service ready on: http://localhost:${config.mysqlService.port}`);
})
