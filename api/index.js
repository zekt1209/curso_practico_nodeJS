const express = require('express');

// Documentacion de nuestra API
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// Llamamos al archivo de config.js donde exportamos el puerto
const config = require('../config.js');

// Llamamos a la parte de red de nuestro componente "user"
const user = require('./components/user/network.js');

// Creamos la aplicacion de express
const app = express();

// Creamos las rutas - ROUTER (endpoints)
    // Rise
    app.get('/', (req, res) => {
        // res.contentType('text/html')
        res.status(200)
        res.send('<h1>This is the RISE page</h1><p>Hey, this app was built by Victor with express.js</p>')
    })

    // User
    app.use('/api/user', user)

    // Documentacion
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Levantamos el servidor en el puerto especificado
app.listen(config.api.port, () => {
    console.log('Ready on: http://localhost:' + config.api.port);
})

console.log(config)