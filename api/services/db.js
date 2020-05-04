const config = require('../config')

const knex = require('knex')({
  client: 'pg',
  connection: config.pg.connStr
});

module.exports = knex;
