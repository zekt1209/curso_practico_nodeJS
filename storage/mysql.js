const mysql = require("mysql");
const mysql2 = require("mysql2");
const config = require("../config");
const error = require("../utils/error");

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

// Connection

let connection;

function handleCon() {
    // Creamos la conexion con las credenciales y configuracion de la DB
    connection = mysql2.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error("error connecting: " + err.stack);
            setTimeout(handleCon, 2000);
            // return;
        }

        console.log("connected as id " + connection.threadId);
    });

    connection.on("error", (err) => {
        console.error("[db error] - " + err);

        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleCon();
        } else {
            throw err;
        }
    });
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id= ${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id= ?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

/*  function upsert(table, data) {

    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    } 

}  */

async function upsert(table, data) {
    // Operacion para tabla user
    /* if (table == 'user') {
    } */
    let row = [];

    if (data.id) {
        // Valida si ya existe ese usuario en la DB
        row = await get(table, data.id);
    }

    if (row.length === 0) {
        // No existe
        return insert(table, data);
    } else {
        // Si existe
        return update(table, data);
    }
}

// Old Structure - before following function 
/* function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        });
    });
} */

function query(table, query, join) {

    // Esto es necesario para la funcion de obtener followers
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null); // -> Devuelve solo 1 follower (registros)
            // resolve(res || null); // -> Devuelve un array con todos los followers (registros)
        });
    });
}


function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id= '${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(`Registro eliminado correctamente!`);
        });
    });
}

/* async function list(table) {

        const data = await connection.query(`SELECT * FROM ${table}`);
        return data;

} */

module.exports = {
    list,
    get,
    upsert,
    insert,
    update,
    query,
    remove,
};
