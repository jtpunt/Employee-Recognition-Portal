var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Pie chart that shows how awards differ by departments across all locations
router.get("/", middleware.isLoggedIn, (req, res) => {
    console.log("in dept route..");
    var redirect = "/admin";
    var render = "admin/department/show";
    // var stylesheets = [];
    // var scripts = ["/static/js/drawPieChart.js"];
    sql.findAndRet(req, res, sql.getDeptAwards, redirect);
});
// Show Award Information by a specified Department
router.get("/:id", middleware.isLoggedIn, (req, res) => { 
    var redirect = "/admin";
    var render = "admin/department/show";
    var stylesheets = [];
    var scripts = ["/static/js/drawPieChart.js"];
    sql.findById(req, res, sql.getDeptAwardsById, redirect, render, stylesheets, scripts);
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
});
module.exports = router;
