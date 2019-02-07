var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "localhost",
  user            : "jonathan",
  password        : "1ch33s31",
  database        : "Capstone"
});

module.exports.pool = pool;