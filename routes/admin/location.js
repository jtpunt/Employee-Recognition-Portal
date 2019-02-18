var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// Pie Chart That Shows how awards differ by Location
router.get("/", middleware.isLoggedIn, (req, res) => {
	var redirect = "/admin";
    var render = "admin/location/show";
    var stylesheets = null;
    var scripts = ["/static/js/drawPieChart.js"];
    sql.findAndRet(req, res, sql.getLocAwards, redirect);
    // sql.find(req, res, sql.getLocAwards, redirect, render, stylesheets, scripts);
	// This sql statement counts how many awards there are at each location
});
// Pie Chart that shows how awards differ by department at a specific location
router.get("/:id", middleware.isLoggedIn, (req, res) => {
	var redirect = "/admin";
    var render = "admin/location/show";
    var stylesheets = null;
    var scripts = ["/static/js/drawPieChart.js"];
	sql.findById(req, res, sql.getLocAwardsById, redirect, render, stylesheets, scripts);
});
module.exports = router;
