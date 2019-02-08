var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// Pie Chart That Shows how awards differ by Location
router.get("/", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
	var redirect = "/admin";
    var render = "admin/location/show";
    var stylesheets = null;
    var scripts = "/static/js/drawPieChart.js";
    sql.find(req, res, sql.getLocAwards, redirect, render, stylesheets, scripts);
	// This sql statement counts how many awards there are at each location
});
// Pie Chart that shows how awards differ by department at a specific location
router.get("/:id", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query(sql.getLocAwardsById, req.params.id, (error, results, fields) => {
		if(error){
            // req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.locationAwards = results[0];
            console.log(context);
			// res.render('admin/location/show', context);
        }
	});
});
module.exports = router;
