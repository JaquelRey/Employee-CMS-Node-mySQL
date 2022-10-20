const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Torture",
  database: "employees",
  multipleStatements: true
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected!");
});

module.exports = connection;
