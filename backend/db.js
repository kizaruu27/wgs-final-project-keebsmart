const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'manman123',
    database: 'keebsmart_db',
    host: 'localhost',
    port: 5432
});

module.exports = { pool }