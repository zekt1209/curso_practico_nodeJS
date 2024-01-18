module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secreto',
    },
    mysql: {
        // Link del host de mysql: https://www.freemysqlhosting.ne
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql10677467',
        password: process.env.MYSQL_PASSWORD || 'rqPnyVCtQv',
        database: process.env.MYSQL_DATABASE || 'sql10677467',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}