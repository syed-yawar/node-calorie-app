module.exports = {
    up: `CREATE TABLE users 
    (
        id INT NOT NULL, UNIQUE KEY id (id), 
        name TEXT
    )`,
    down: 'DROP TABLE users',
};
