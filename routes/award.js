var express    = require("express"),
    middleware = require("../middleware"),
    sql        = require("../sql"),
    router     = express.Router();

/* QUERYING AWARDS ROUTES */
// SHOW ALL AWARDS
router.get("/", (req, res) => {
    var redirect = "/admin";
    var render = "admin/employee/show";
    var stylesheets = ["/static/css/admin-employee.css"];
    var scripts = [];
    sql.find(req, res, sql.getAllAwards, redirect, render, stylesheets, scripts);
});

// AWARDS NEW - shows form to create award
router.get("/new", (req, res) => {
	// ERROR CHECK 1 - user must be logged in to get to this page
	// ERROR CHECK 2 - user who is logged  in MUST NOT be an admin
    res.render("award/new");
});
// CREATE AWARDS ROUTE
router.post("/", (req, res) => {
    var redirect = "/awards";
    sql.createAward(req, res, sql.setNewAward, redirect);
    // ERROR CHECK 1 - assure that the data sent in the requests body is not null
    // ERROR CHECK 2 - assure that the user_id, award_id, and employee_id passed in corresponds to an entry in the database
    // ERROR CHECK 3 - user must be logged in to get to this page
	// ERROR CHECK 4 - user who is logged  in MUST NOT be an admin
});
module.exports = router;