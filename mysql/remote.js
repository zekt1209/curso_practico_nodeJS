const request = require('request');
const axios = require('axios');

function createRemoteDB(host, port) {
    const URL = 'http://' +host+ ':' +port;

    function list(table) {
        return req('GET', table);
    }
    
    // function get(table, id) {}
    // function upsert(table, data) {}
    // function query(table, query, join) {}


        async function req (method, table, data) {
            let url = URL +'/'+ table;
            body = '';

            try {                
                const response = await axios({
                    method,
                    url,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                });

                return response.data.body;

            } catch (err) {
                console.log('method: ' + method + 'url: ' + url);
                console.error('Error en la funcion req de la base de datos remota', err);
            }
        }



/*             request({
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
    }
    
}

module.exports = createRemoteDB;