const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'manman123',
    database: 'postgres',
    host: 'localhost',
    port: 5432
});

module.exports = { pool }