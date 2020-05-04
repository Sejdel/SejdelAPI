// global config file for api

require('dotenv').config()

const environment = process.env.NODE_ENV || 'development'

// general configuration, e.g. db credentials
const general = {
  pg: {
    // DB_USER, DB_PASS, DB_NAME are environment variables and need to be declared as such,
    // either in a .env file or in plain system
    connStr: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/${process.env.DB_NAME}`,
  },
}

// dev config inherits from general config
const development = {
  ...general,
}

// so does production
const production = {
  ...general,
}

// both config environments
const config = {
  development,
  general,
}

module.exports = config[environment]
