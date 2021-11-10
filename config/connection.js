// mySQL package that makes the magic happen
const mysql = require('mysql2');

require('dotenv').config();
// define mySQL server connection auth
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'employee_tracker',
});

module.export = connection;
