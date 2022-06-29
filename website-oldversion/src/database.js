const mariadb = require('mariadb');
const qLastTemp = "SELECT temperature, date from temperature ORDER BY id DESC LIMIT 0,1";
const qLastHum = "SELECT humidity, date from humidity ORDER BY id DESC LIMIT 0,1";
const qLastPreas = "SELECT preasure, date from preasure ORDER BY id DESC LIMIT 0,1";
const qLastBrig = "SELECT brightness, date from brightness ORDER BY id DESC LIMIT 0,1";
const qTemp20 = "SELECT * FROM (SELECT temperature, date from temperature ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC";
const qHum20 = "SELECT * FROM (SELECT humidity, date from humidity ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC";
const qPreas20 = "SELECT * FROM (SELECT preasure, date from preasure ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC";
const qBrig20 = "SELECT * FROM (SELECT brightness, date from brightness ORDER BY date DESC LIMIT 20) Var1 ORDER BY date ASC";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 5
});

module.exports.getDataDB = async (query) => {
  switch(query) {
    case 'lastTemp':
      query = qLastTemp;
      break;
    case 'lastHum':
      query = qLastHum;
      break;
    case 'lastPreas':
      query = qLastPreas;
      break;
    case 'lastBrig':
      query = qLastBrig;
      break;
    case 'temp20':
      query = qTemp20;
      break;
    case 'hum20':
      query = qHum20;
      break;
    case 'preas20':
      query = qPreas20;
      break;
    case 'brig20':
      query = qBrig20;
      break;
    default:
      // code block
  } 

  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(query);
    conn.end();
    return rows;
  }
  catch (err) {
    console.log(err.message);
    conn.end();
    return err;
  }
}