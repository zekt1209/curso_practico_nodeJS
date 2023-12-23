const db = {
    'user': [
        {'id': '1','name': 'Victor'}
    ],
    'location': [
        {'id': 'S-123456', 'location_name': 'Guadalajara, Jal, Mexico'},
        {'id': 'S-246801', 'location_name': 'Guanajuato, Mexico'}
    ],
};

// Funciones de nuestra base de datos dummy (CRUD)

function list(table) {
    return db[table];
}

function get(table, id) {
    let collection = list(table);
    return collection.filter(item => item.id === id)[0] || null;
}

function upsert(table, data) {
    db[collection].push(data);
}

function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}