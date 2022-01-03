const mysql = require("mysql");
require("dotenv").config();

function connectDB() {
  const conn = mysql.createConnection({
    host: process.env.DB_HOST_IP,
    user: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    database: "user",
  });

  conn.connect();

  console.log("DB CONNECTED");

  return conn;
}

function disconnectDB(conn) {
  console.log("DB ENDED");
  conn.end();
}

module.exports = { connectDB, disconnectDB };
