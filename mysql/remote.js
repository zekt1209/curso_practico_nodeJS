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

        if (method == 'POST' || method == 'PUT') {
            data = JSON.stringify(data);
        }

        try {                
            const response = await remoteDataBaseCall({
                method: method,
                url: url,
                data: data
            });
            console.log('request: ' + JSON.stringify(data));
            console.log('response: ' + JSON.stringify(response.data.body));
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
                url: `/${table}`,
                data});
    }
    
    function update(table, data) {
        // throw new Error('Not Implemented');
        return req({
            method: 'PUT',
            url: `/${table}/${data.id}`,
            data});
    }
    
    async function upsert(table, data) {
        // return req({
        //     method: 'PUT',
        //     url: `upsert/${table}`,
        //     data});

        let row = [];

        if (data.id) {
            // Valida si ya existe ese usuario en la DB
            row = await get(table, data.id);
        }
    
        if (row.length === 0) {
            // No existe
            console.log('Entre al metodo insert')
            return insert(table, data);
        } else {
            // Si existe
            console.log('Entre al metodo update')
            return update(table, data);
        }
    }

    async function remove(table, id) {
        return req({
            method: 'DELETE',
            url: `${table}/${id}`});
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
        remove,
    }
    
}

module.exports = createRemoteDB;