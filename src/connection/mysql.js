import mysql from 'mysql';
import migration from 'mysql-migrations';
import path from 'path';

export const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db_name',
});

migration.init(connection, path.join(__dirname, '../migrations'));
