var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

/* QUERYING AWARDS ROUTES */
// SHOW ALL AWARDS granted by the logged in user
router.get("/", middleware.isUser, (req, res) => {
    var redirect = "/user";
    console.log("in main award route, returning data");
    sql.findByIdAndRet(req, res, sql.getAwardsByUserId, redirect);
});
// AWARDS NEW - shows form to create award
router.get("/new", middleware.isUser, (req, res) => {
	// ERROR CHECK 1 - user must be logged in to get to this page
	// ERROR CHECK 2 - user who is logged  in MUST NOT be an admin
    res.render("user/new");
});
// CREATE AWARDS ROUTE
router.post("/", middleware.isUser, (req, res) => {
    var redirect = "/user";
    sql.createAward(req, res, sql.setNewAward, redirect);
    // ERROR CHECK 1 - assure that the data sent in the requests body is not null
    // ERROR CHECK 2 - assure that the user_id, award_id, and employee_id passed in corresponds to an entry in the database
    // ERROR CHECK 3 - user must be logged in to get to this page
	// ERROR CHECK 4 - user who is logged  in MUST NOT be an admin
});
// Handles deletion of awards that the logged in user has granted
router.delete("/:id", middleware.isUser, (req, res) => {
    console.log("Delete request received: ", req.params.id);
    var redirect = "/user";
    sql.removeAward(req, res, sql.deleteAward, redirect);
});
module.exports = router;