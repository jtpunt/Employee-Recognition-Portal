var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// Pie Chart That Shows how awards differ by Location
router.get("/", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
	// This sql statement counts how many awards there are at each location
	mysql.pool.query(sql.getLocAwards, (error, results, fields) => {
		if(error){
            // req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.locationAwards = results;
            console.log(context);
			res.render('admin/location/show', {locationAwards: results, scripts: ["/static/js/drawPieChart.js"]});
        }
	});
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
