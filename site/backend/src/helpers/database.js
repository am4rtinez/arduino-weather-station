const mariadb = require('mariadb');
const config =  require('../config/database.config')

const pool = mariadb.createPool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
  connectionLimit: 5
});

module.exports = pool