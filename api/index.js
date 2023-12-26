const express = require('express');

// Llamamos al archivo de config.js donde exportamos el puerto
const config = require('../config.js');

// Llamamos a la parte de red de nuestro componente "user"
const user = require('./components/user/network.js');

// Creamos la aplicacion de express
const app = express();

// Creamos las rutas - ROUTER (endpoints)
app.use('/api/user', user)

// Levantamos el servidor en el puerto especificado
app.listen(config.api.port, () => {
    console.log('Ready on: http://localhost:' + config.api.port);
})

console.log(config)