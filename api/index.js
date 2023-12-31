const express = require("express");

// Documentacion de nuestra API
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

// Llamamos al archivo de config.js donde exportamos el puerto
const config = require("../config.js");

// Llamamos a la parte de red de nuestro componente "user"
const user = require("./components/user/network.js");
// Llamamos a la parte de red de nuestro componente "auth"
const auth = require("./components/auth/network.js");

// En este archivo gestionamos los errores para mandar mensajes y statusCodes segun el error que vayamos a lanzar
const { errors } = require("../network/errors");

// Creamos la aplicacion de express
const app = express();

// Creamos las rutas - ROUTER (endpoints)
// Rise
app.get("/", (req, res) => {
    // res.contentType('text/html')
    res.status(200);
    // res.send('<h1>This is the RISE page</h1><p>Hey, this app was built by Victor with express.js</p>')
    res.sendFile("./index.html", { root: __dirname });
    // res.send
});

// User
app.use("/api/user", user);

// Auth
app.use("/api/auth", auth);

// Documentacion
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Gestion de errores
app.use(errors);

// Levantamos el servidor en el puerto especificado
app.listen(config.api.port, () => {
    console.log("Ready on: http://localhost:" + config.api.port);
});

// console.log(config);
