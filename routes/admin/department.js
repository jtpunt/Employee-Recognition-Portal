var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Pie chart that shows how awards differ by departments across all locations
router.get("/", middleware.isLoggedIn, (req, res) =>{
    var context = {};
    var redirect = "/admin";
    var render = "admin/department/show";
    var stylesheets = null;
    var scripts = "/static/js/drawPieChart.js";
    sql.find(req, res, sql.getDeptAwards, redirect, render, stylesheets, scripts);
});
// Show Award Information by a specified Department
router.get("/:id", middleware.isLoggedIn, (req, res) => { 
	var context = {};
    var redirect = "/admin";
    var render = "admin/department/show";
    var stylesheets = null;
    var scripts = "/static/js/drawPieChart.js";
    sql.findById(req, res, sql.getDeptAwardsById, redirect, render, stylesheets, scripts);
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
});
module.exports = router;
