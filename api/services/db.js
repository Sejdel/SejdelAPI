const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'flyway',
    password : '123',
    database : 'sejdeldb'
  }
});

module.exports = knex;