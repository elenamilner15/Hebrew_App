const pgp = require('pg-promise')();
const db = pgp({
    connectionString: 'postgresql://postgres:test@localhost/ffp',
});

module.exports = db;