// mySQL package that makes the magic happen
const mysql = require("mysql2");

// importing and requiring .env authentication file
require("dotenv").config();

// define mySQL server connection auth
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "employees",
});

module.export = connection;
