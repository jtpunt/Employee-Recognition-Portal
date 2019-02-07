var express    = require("express"),
    middleware = require("../../middleware"),
    router     = express.Router();
// Pie Chart That Shows how awards differ by Location
router.get("/", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
	// This sql statement counts how many awards there are at each location
	var sql = "SELECT COUNT(d.id) AS Award_Count, l.city AS Category FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g ON e.id = g.employee_id "
		sql += "INNER JOIN Location l on d.location_id = l.id "
		sql += "GROUP BY l.city;"
	mysql.pool.query(sql, (error, results, fields) => {
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
	var sql = "SELECT COUNT(d.id) AS 'Award Count', l.city FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g ON e.id = g.employee_id "
		sql += "INNER JOIN Location l on d.location_id = l.id "
		sql += "WHERE l.id = ?";
		sql += "GROUP BY l.city;"
	mysql.pool.query(sql, req.params.id, (error, results, fields) => {
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
