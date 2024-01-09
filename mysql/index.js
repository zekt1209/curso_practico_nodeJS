const express = require('express');
const router = require('./network');
const config = require('../config');


const app = express();

app.use(express.json());


// Rutas / Endpoints
router.use('/', router);


app.listen(config.mysqlService.port, () => {
    console.log(`mysql Service ready on: http://localhost:${config.mysqlService.port}`);
})
