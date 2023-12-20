const express = require('express');

// Llamamos al archivo de config.js donde exportamos el puerto
const config = require('../config.js');

// Creamos la aplicacion de express
const app = express();

// ROUTER

app.listen(config.api.port, () => {
    console.log('Ready on: http://localhost:' + config.api.port);
})

console.log(config)