var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "oniddb.cws.oregonstate.edu",
  user            : "nelsorya-db",
  password        : "2bElFsS8El1JciQI",
  database        : "nelsorya-db"
});

module.exports.pool = pool;