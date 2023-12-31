const jwt = require("jsonwebtoken");
const config = require("../config");
// Modulo para gestion avanzada de errores
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error(error.message);
    }
}

// ---------------------------------------------
// Gestion de permisos

const check = {
    own: function (req, owner) {
        // Aqui es dondevamos a hacer toda la compobacion
        // 1- Decodificar el token
        const decoded = decodeHeader(req);
        console.log(decoded);

        // Comprbar si es o no propio
        if (decoded.id !== owner) {
            throw error("No puedes hacer esto", 401);
            // throw new Error("No puedes hacer esto");
        }
    },
};

function getToken(auth) {
    // Bearer kslhjndioadhieohjioejniewo

    // Asegurarnos de que venga un header o no
    if (!auth) {
        throw new Error("No viene token");
    }

    // Asegurarnos que el formato del token sea correcto 'Bearer token'
    if (auth.indexOf("Bearer ") == -1) {
        throw new Error("Formato de token invalido");
    }

    // - Tenemos que quitar el 'Bearer '
    let token = auth.replace("Bearer ", "");

    return token;
}

// 1- Decodificar el token
function decodeHeader(req) {
    // Una vez tengamos la request, generaremos el token decodificado
    // El header que queremos recibir
    const authorization = req.headers.authorization || "";

    // Sacar el token desde el tipo de header que venga
    const token = getToken(authorization);

    // Ejecutar funcion que verifique que el token es valido
    const decoded = verify(token);

    // Lo dejamos en la request por si queremos utilizar esta info mas adelante
    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};
