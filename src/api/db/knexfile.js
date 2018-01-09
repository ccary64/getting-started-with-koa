const path = require('path');

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host : 'db',
      user : process.env.POSTGRES_USER,
      database : process.env.POSTGRES_DB
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: {
      host : 'db',
      user : process.env.POSTGRES_USER,
      database : process.env.POSTGRES_DB
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    }
  }
};