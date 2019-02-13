var express    = require("express"),
    router     = express.Router();

/* QUERYING AWARDS ROUTES */
// SHOW ALL AWARDS
router.get("/", (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
	getAwards(res, mysql, context, complete);
	function complete(){

	}
});

// AWARDS NEW - shows form to create award
router.get("/new", (req, res) => {
	// ERROR CHECK 1 - user must be logged in to get to this page
	// ERROR CHECK 2 - user who is logged  in MUST NOT be an admin
    res.render("award");
});
// CREATE AWARDS ROUTE
router.post("/", (req, res) => {
    var redirect = "/award";
    sql.createAward(req, res, sql.setNewAward, redirect);
    // ERROR CHECK 1 - assure that the data sent in the requests body is not null
    // ERROR CHECK 2 - assure that the user_id, award_id, and employee_id passed in corresponds to an entry in the database
    // ERROR CHECK 3 - user must be logged in to get to this page
	// ERROR CHECK 4 - user who is logged  in MUST NOT be an admin
});
module.exports = router;