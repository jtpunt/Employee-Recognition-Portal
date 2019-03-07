var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "localhost",
  user            : "jonathan",
  password        : "password",
  database        : "Capstone"
});

module.exports.pool = pool;