var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// This route is called by a fetch request and it returns the # of awards that
// were granted to each location. This data will be displayed in a 
// pie chart on the admin dashboard page.
router.get("/", middleware.isAdmin, (req, res) => {
	var redirect = "/admin";
    sql.findAndRet(req, res, sql.getLocAwards, redirect);
    // sql.find(req, res, sql.getLocAwards, redirect, render, stylesheets, scripts);
	// This sql statement counts how many awards there are at each location
});
// This route is called by a fetch request and it returns all dlocation names 
// and ids. This data will be used to populate a drop-down menu for selecting
// and viewing the # of awards of a specified location.
router.get("/all", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    sql.findAndRet(req, res, sql.getLocIds, redirect);
});
// This route is called by a fetch request and it returns the # of awards
// that were granted to the specified location. This data will be displayed 
// in a pie chart on the admin dashboard page.
router.get("/:id", middleware.isAdmin, (req, res) => {
	var redirect = "/admin";
	sql.findByIdAndRet(req, res, sql.getLocAwardsById, redirect);
});

module.exports = router;
