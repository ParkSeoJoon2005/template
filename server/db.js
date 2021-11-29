const mysql = require("mysql");
const { connect } = require("./router/auth/auth");
require("dotenv").config();
const conn = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: process.env.DB_PASSWORD,
  database: "template",
});

conn.connect();

module.exports = conn;
