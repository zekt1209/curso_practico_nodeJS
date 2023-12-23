const express = require('express');

// Llamamos al archivo de config.js donde exportamos el puerto
const config = require('../config.js');
const user = require('./components/user/network.js');

// Creamos la aplicacion de express
const app = express();

// ROUTER (endpoints)
app.use('/api/user', user)

app.listen(config.api.port, () => {
    console.log('Ready on: http://localhost:' + config.api.port);
})

console.log(config)