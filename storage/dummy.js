const db = {
    'user': [
        {'id': '1','name': 'Victor'},
        {'id': '2','name': 'Marco'},
        {'id': '3','name': 'Angel'},
    ],
    'location': [
        {'id': 'S-123456', 'location_name': 'Guadalajara, Jal, Mexico'},
        {'id': 'S-246801', 'location_name': 'Guanajuato, Mexico'}
    ],
};

// Funciones de nuestra base de datos dummy (CRUD)

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
    db[collection].push(data);
}

async function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}