var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// Pie Chart That Shows how awards differ by Location
router.get("/", middleware.isAdmin, (req, res) => {
	var redirect = "/admin";
    sql.findAndRet(req, res, sql.getLocAwards, redirect);
    // sql.find(req, res, sql.getLocAwards, redirect, render, stylesheets, scripts);
	// This sql statement counts how many awards there are at each location
});
router.get("/all", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    sql.findAndRet(req, res, sql.getLocIds, redirect);
});
// Pie Chart that shows how awards differ by department at a specific location
router.get("/:id", middleware.isAdmin, (req, res) => {
	var redirect = "/admin";
	sql.findByIdAndRet(req, res, sql.getLocAwardsById, redirect);
});

module.exports = router;
