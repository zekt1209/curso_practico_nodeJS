// TODO LO DE REDIS
const redis = require('redis');
const config = require('../config');

/* const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    user: config.redis.user,
}); */
const client = redis.createClient({
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port,
    }
});



(async () => {
    try {
        await client.connect();
        console.log('Conectado a REDIS');
    } catch (err) {
        console.log('Error en funcion connect: ' + err);
    }
  })(); 

/* function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) return reject(err);

            let res = data || null;
            if (data) {
                console.log('Encontre, data, la data es: ' + res);
                res = JSON.stringify(data);
            }
            resolve(res);
        })
    })
} */

async function list(table) {
    try {
        const value = await client.get(table);
        return JSON.parse(value);
    } catch (err) {
        console.log('Error en function list de redis: ' + err);
    }
}

async function get(table, id) {
    try {
        const value = await client.get(`${table}_${id}`);
        return JSON.parse(value);
    } catch (err) {
        console.log('Error en la funcion get de redis: ' + err);
    }
}

/* function upsert(table, data) {
    let key = table;
    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setEx(key, 10, JSON.stringify(data));
    return true;
} */

async function upsert(table, data) {
    try {
        let key = table;
        if (data && data.id) {
            key = key + '_' + data.id;
        }
        await client.set(key, JSON.stringify(data));
        return true;

    } catch (err) {
        console.log('Error en funcion upsert de redis: ' + err);
    }
}

module.exports = {
    list,
    get,
    upsert,
}