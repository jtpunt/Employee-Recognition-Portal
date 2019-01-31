var express    = require("express"),
    router     = express.Router();
/* QUERYING AWARDS ROUTES */
// SHOW ADMIN PAGE
router.get("/", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "SELECT u.username AS 'Granted By', a.title, CONCAT(e.fname, ' ', e.lname) AS 'Award Recipient', g.grant_date "
		sql += "FROM Granted g INNER JOIN User u ON g.user_id = u.id ";
		sql += "INNER JOIN Award a ON g.award_id = a.id ";
		sql += "INNER JOIN Employee e ON g.employee_id = e.id;";
	mysql.pool.query(sql, function(error, result, fields){
		if(err){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.granted = results;
		res.render('admin/', context);
	})
});
// SHOW ALL Employees who have received 'Employee of the Week' or 'Employee of the Month'
router.get("/:id", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql'); 
	// validate the :id parameter sent in, can only be 'Employee of the Week' or 'Employee of the Month'
	var sql = "SELECT * FROM Awards WHERE id = ?";
	mysql.pool.query(sql, req.params.id, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			// make sure that the award id exists in the database
			context.employees = results[0];
			res.render('admin/', context);
		}
	})
	// ERROR CHECK 1 - Assure that an admin has navigated to this page

});
// Pie chart that shows how awards differ by departments across all locations
router.get("/departments", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	// This sql statement counts how many awards there are in each department
	var sql = "SELECT COUNT(d.id) AS 'Award Count', d.name AS 'Department' FROM Department d ";
        sql += "INNER JOIN Employee e on d.id = e.department_id ";
        sql += "INNER JOIN Granted g ON e.id = g.employee_id "
        sql +=  "GROUP BY d.id;"
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// Show Award Information by Department
router.get("/departments/:id", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "SELECT CONCAT(e.fname, ' ', e.lname) AS 'Employee Name', COUNT(e.id) AS 'Awards Received', d.name AS 'Department'";
		sql += "FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g on e.id = g.employee_id ";
		sql += "WHERE d.id = ? ";
		sql += "GROUP BY e.id ";
	mysql.pool.query(sql, req.params.id, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			// make sure that the award id exists in the database
			context.employees = results[0];
			res.render('admin/', context);
		}
	})
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});


// Pie Chart That Shows how awards differ by Location
router.get("/location", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	// This sql statement counts how many awards there are at each location
	var sql = "SELECT COUNT(d.id) AS 'Award Count', l.city FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g ON e.id = g.employee_id "
		sql += "INNER JOIN Location l on d.location_id = l.id "
		sql += "GROUP BY l.city;"
});
// Pie Chart that shows how awards differ by department at a specific location
router.get("/location/:id", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	var sql = "SELECT COUNT(d.id) AS 'Award Count', l.city FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g ON e.id = g.employee_id "
		sql += "INNER JOIN Location l on d.location_id = l.id "
		sql += "WHERE l.id = ?";
		sql += "GROUP BY l.city;"
	mysql.pool.query(sql, req.params.id, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			// make sure that the award id exists in the database
			context.employees = results[0];
			res.render('admin/', context);
		}
	})
});


/* ADD/EDIT/DELETE users routes*/
// Add normal/admin user
router.get("/user", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	// Takes you to the form to add a user
});
// EDIT Listing
router.get("/user/:id", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	// Takes you to the form to add a user
});
// UPDATE normal/admin user
router.put("/user/:id", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// DELETE normal/admin user
router.delete("/user/:id", function(req, res){

});
module.exports = router;
function getAwards(res, mysql, context, id, complete){
	var sql = "SELECT * FROM Granted";
	// USER grants an Employee an award
	// USER =/= Employee, i.e., user should not be able to grant an award to themself
}