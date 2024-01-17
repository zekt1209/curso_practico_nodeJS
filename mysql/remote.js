const request = require('request');

function createRemoteDB(host, port) {
    const URL = 'http://' +host+ ':' +port;

    function list(table) {
        return request('GET', table);
    }
    
    // function get(table, id) {}
    // function upsert(table, data) {}
    // function query(table, query, join) {}
    
}