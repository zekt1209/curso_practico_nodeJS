// const request = require('request');
const axios = require('axios');

function createRemoteDB(host, port) {
    const URL = 'http://' +host+ ':' +port;

    // Objeto de configuracion de axios
    const remoteDataBaseCall = axios.create({
        baseURL: URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    async function req ({method, url, data}) {
        // let url = URL +'/'+ table;
        // body = '';

        try {                
            const response = await remoteDataBaseCall({
                method: method,
                url: url,
                data: data
            });

            return response.data.body;

        } catch (err) {
            console.log('method: ' + method + 'url: ' + url);
            console.error('Error en la funcion req de la base de datos remota', err);
        }
    }

    function list(table) {
        return req({
            method: 'GET',
            url: `/${table}`});
    }

    function get(table, id) {
        return req({
            method: 'GET',
            url: `${table}/${id}`});
    }

    function query(table, query, join = '') {
        return req({
            method: 'GET',
            url: `/query/${table}`,
            data: {
                "query": query,
                "join": join
            }
        })
    }

    function insert(table, data) {
            return req({
                method: 'POST',
                url: `${table}`,
                data});
    }
    
    function update(table, data_id, data) {
        throw new Error('Not Implemented');
    }
    
    async function upsert(table, data) {
        return req({
            method: 'PUT',
            url: `upsert/${table}`,
            data});
    }



    // function get(table, id) {}
    // function upsert(table, data) {}
    // function query(table, query, join) {}


/*   request({
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        url,
        body,
    }, (err, req, body) => {
        if (err) {
            console.error('Error en la funcion req de la base de datos remota', err);
            return reject(err.message);
        }

        const resp = JSON.parse(body);
        return resolve(resp.body);
    }) */
        
    return {
        list,
        get,
        query,
        insert,
        update,
        upsert,
    }
    
}

module.exports = createRemoteDB;