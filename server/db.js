const mysql = require("mysql");
const { connect } = require("./router/auth/auth");
require("dotenv").config();
const conn = mysql.createConnection({
  host: process.env.DB_HOST_IP,
  user: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  database: "user",
});

conn.connect();

module.exports = conn;
