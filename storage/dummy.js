const db = {
    'user': [
        {'id': '1','name': 'Victor', 'username': 'zekt1298'},
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
/*  [
        { id: '1', name: 'Victor' },
        { id: '2', name: 'Marco' },
        { id: '3', name: 'Angel' }
    ] */
}

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
/*     let collection = await list(table);
    collection.push(data); */

    if (!db[table]) {
        db[table] = [];
    }
    
    db[table].push(data);
    
    console.log(db);

    // return data;
}

async function remove(table, id) {
    // let collection = await list(table);
    const index = db[table].findIndex(item => item.id === id);
    if (index != -1) {
        db[table].splice(index, 1);
    }
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}