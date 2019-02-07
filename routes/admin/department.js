var express    = require("express"),
    middleware = require("../../middleware"),
    router     = express.Router();

// Pie chart that shows how awards differ by departments across all locations
router.get("/", middleware.isLoggedIn, (req, res) =>{
    var context = {};
    var mysql = req.app.get('mysql');
    // This sql statement counts how many awards there are in each department
    var sql = "SELECT COUNT(d.id) AS Award_Count, d.name AS Category FROM Department d ";
        sql += "INNER JOIN Employee e on d.id = e.department_id ";
        sql += "INNER JOIN Granted g ON e.id = g.employee_id "
        sql +=  "GROUP BY d.id;"
    mysql.pool.query(sql, function(error, results, fields){
        if(error){
            req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.deptAwards = results;
            // console.log(context);
            res.render('admin/department/show', {deptAwards: results, scripts: ["/static/js/drawPieChart.js"]});
        }
    });
});
// Show Award Information by a specified Department
router.get("/:id", middleware.isLoggedIn, (req, res) => { 
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "SELECT CONCAT(e.fname, ' ', e.lname) AS 'Employee Name', COUNT(e.id) AS 'Awards Received', d.name AS 'Department'";
		sql += "FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g on e.id = g.employee_id ";
		sql += "WHERE d.id = ? ";
		sql += "GROUP BY e.id ";
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
	mysql.pool.query(sql, req.params.id, (error, results, fields) => {
		if(error){
            // req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.deptAwards = results[0];
            console.log(context);
			// res.render('admin/department/show', context);
        }
	});
});
module.exports = router;
