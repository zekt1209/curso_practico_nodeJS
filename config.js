module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secreto',
    },
    mysql: {
        // Link del host de mysql: https://www.freemysqlhosting.net
        // pocexe1842@alibrs.com
        // test123
        host: process.env.MYSQL_HOST || 'sql5.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql5681261',
        password: process.env.MYSQL_PASSWORD || '883KkQLQAS',
        database: process.env.MYSQL_DATABASE || 'sql5681261',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host: process.env.CACHE_SRV_HOST || 'localhost',
        port: process.env.CACHE_SRV_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_SRV_HOST || 'redis-10212.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: process.env.REDIS_SRV_PORT || 10212,
        password: process.env.REDIS_SRV_PASSWORD || 'dVhQhBLxAxcyMUqp8DioE0A9fuwnh7R0',
        user: process.env.REDIS_SRV_USER || 'default',
        database: process.env.REDIS_SRV_DATABASE || 'VICTORJAVIER-free-db',
    }
}