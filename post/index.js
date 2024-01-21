const express = require("express");

// Llamamos al archivo de config.js donde exportamos el puerto
const config = require("../config.js");


// ------------- Componentes --------------------------------
// Llamamos a la parte de red de nuestro componente "post"
const post = require("./components/post/network.js");
// ----------------------------------------------------------


// En este archivo gestionamos los errores para mandar mensajes y statusCodes segun el error que vayamos a lanzar
const { errors } = require("../network/errors");

// Creamos la aplicacion de express
const app = express();


// ------------- Rutas --------------------------------------
// Creamos las rutas - ROUTER (endpoints)

// Post
app.use("/api/post", post);

// ----------------------------------------------------------

// Gestion de errores
app.use(errors);

// Levantamos el servidor en el puerto especificado
app.listen(config.post.port, () => {
    console.log("Ready on: http://localhost:" + config.post.port);
});

// console.log(config);
