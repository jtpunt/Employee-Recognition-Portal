var express    = require("express"),
    router     = express.Router();

/* QUERYING AWARDS ROUTES */
// SHOW ALL AWARDS
router.get("/", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	getAwards(res, mysql, context, complete);
	function complete(){

	}
});

// AWARDS NEW - shows form to create award
router.get("/new", function(req, res){
	// ERROR CHECK 1 - user must be logged in to get to this page
	// ERROR CHECK 2 - user who is logged  in MUST NOT be an admin
});
// CREATE AWARDS ROUTE
router.post("/", function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Granted(user_id, award_id, employee_id, grant_date) VALUES (?, ?, ?, ?)";
    var inserts = [req.body.user_id, req.body.award_id, req.body.employee_id, req.body.grant_date];
    // ERROR CHECK 1 - assure that the data sent in the requests body is not null
    // ERROR CHECK 2 - assure that the user_id, award_id, and employee_id passed in corresponds to an entry in the database
    // ERROR CHECK 3 - user must be logged in to get to this page
	// ERROR CHECK 4 - user who is logged  in MUST NOT be an admin
    sql = mysql.pool.query(sql, inserts,function(error, results, fields){
        if(error){
            req.flash("error", JSON.stringify(error));
            res.redirect("/awards");
        }else if(results.affectedRows == 0){
            req.flash("error", "Award not added!");
            res.redirect("/lawards");
        }else{
            req.flash("success", "Award successfully added!");
            res.redirect('/awards');
        }
    });
});
module.exports = router;