var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "127.0.0.01",
  user            : "wendazhou",
  password        : "",
  database        : "c9"
});

module.exports.pool = pool;