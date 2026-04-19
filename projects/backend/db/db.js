const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crm_db',
    password: 'prasad@123',
    port: 5433,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error(' Error connecting to DB:', err.stack);
    }
    console.log(' Database connected successfully');

    release(); 
});

module.exports = pool;