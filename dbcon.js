var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : "www.datacrunchonline.com",
  user            : "datacrun_ERA",
  password        : "TXZT11=kcDUA",
  database        : "datacrun_ERA",
  dateStrings 	  : true
});

module.exports.pool = pool;