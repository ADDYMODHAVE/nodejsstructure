const mariadb = require("mariadb");

let connectionPool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const dB = () => {
  return connectionPool;
};

module.exports = dB;
