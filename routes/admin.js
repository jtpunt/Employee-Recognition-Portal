var express    = require("express"),
    middleware = require("../middleware"),
    router     = express.Router();
/* QUERYING AWARDS ROUTES */
// middleware.isLoggedIn - Assures us that an admin has navigated to this page
// SHOW ADMIN PAGE - shows which users created awards
router.get("/", middleware.isLoggedIn, function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
    console.log("in root route");
	// var sql = "SELECT u.username AS 'Granted By', a.title, CONCAT(e.fname, ' ', e.lname) AS 'Award Recipient', g.grant_date "
	// 	sql += "FROM Granted g INNER JOIN User u ON g.user_id = u.id ";
	// 	sql += "INNER JOIN Award a ON g.award_id = a.id ";
	// 	sql += "INNER JOIN Employee e ON g.employee_id = e.id;";
    var sql = "SELECT * FROM Granted";
    mysql.pool.query(sql, function(error, results, fields){
		if(error){
            // req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.allAwards = results[0];
            console.log(context);
			// res.render('admin/employee/show', context);
        }
	});
});
// Shows all Employees who have received a specified award: 'Employee of the Week' or 'Employee of the Month'
router.get("/:id", middleware.isLoggedIn, function(req, res){
	var context = {};
	var mysql = req.app.get('mysql'); 
	// validate the :id parameter sent in, can only be 'Employee of the Week' or 'Employee of the Month'
	var sql = "SELECT * FROM Awards WHERE id = ?";
    mysql.pool.query(sql, req.params.id, function(error, results, fields){
		if(error){
            // req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.deptAwards = results[0];
            console.log(context);
			// res.render('admin/employee/show', context);
        }
	});
});
// Pie chart that shows how awards differ by departments across all locations
router.get("/departments", middleware.isLoggedIn, function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	// This sql statement counts how many awards there are in each department
	var sql = "SELECT COUNT(d.id) AS 'Award Count', d.name AS 'Department' FROM Department d ";
        sql += "INNER JOIN Employee e on d.id = e.department_id ";
        sql += "INNER JOIN Granted g ON e.id = g.employee_id "
        sql +=  "GROUP BY d.id;"
    mysql.pool.query(sql, function(error, results, fields){
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
// Show Award Information by a specified Department
router.get("/departments/:id", middleware.isLoggedIn, function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "SELECT CONCAT(e.fname, ' ', e.lname) AS 'Employee Name', COUNT(e.id) AS 'Awards Received', d.name AS 'Department'";
		sql += "FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g on e.id = g.employee_id ";
		sql += "WHERE d.id = ? ";
		sql += "GROUP BY e.id ";
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
	mysql.pool.query(sql, req.params.id, function(error, results, fields){
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


// Pie Chart That Shows how awards differ by Location
router.get("/locations", middleware.isLoggedIn, function(req, res){
	// This sql statement counts how many awards there are at each location
	var sql = "SELECT COUNT(d.id) AS 'Award Count', l.city FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g ON e.id = g.employee_id "
		sql += "INNER JOIN Location l on d.location_id = l.id "
		sql += "GROUP BY l.city;"
	mysql.pool.query(sql, function(error, results, fields){
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
// Pie Chart that shows how awards differ by department at a specific location
router.get("/locations/:id", middleware.isLoggedIn, function(req, res){
	var sql = "SELECT COUNT(d.id) AS 'Award Count', l.city FROM Department d ";
		sql += "INNER JOIN Employee e on d.id = e.department_id ";
		sql += "INNER JOIN Granted g ON e.id = g.employee_id "
		sql += "INNER JOIN Location l on d.location_id = l.id "
		sql += "WHERE l.id = ?";
		sql += "GROUP BY l.city;"
	mysql.pool.query(sql, req.params.id, function(error, results, fields){
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
// Will allow the admin to navigate to ADD/EDIT/DELETE users routes
router.get("/users", middleware.isLoggedIn, function(req, res){

});

/* ADD/EDIT/DELETE users routes*/
// Add normal/admin user
router.get("/users/new", middleware.isLoggedIn, function(req, res){
	// Takes you to the form to add a user
	res.render("admin/user/new");
});
// EDIT User
router.get("/users/:id/edit", middleware.isLoggedIn, function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "SELECT * FROM User WHERE id = ?;";
	// Takes you to the form to add a user
	mysql.pool.query(sql, req.params.id, function(error, results, fields){
		if(error){
            req.flash("error", JSON.stringify(error));
            res.redirect("/admin");
        }else if(results[0] == undefined){
        	req.flash("error", "User not found!");
            res.redirect('/users/new');
        }else{
        	context.user = results[0];
        	res.render('admin/user/edit', context);
        }
	});
});
// UPDATE normal/admin user
router.put("/users/:id", middleware.isLoggedIn, function(req, res){
	var mysql = req.app.get('mysql');
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	var sql = "UPDATE user SET username=?, password=?, date_created=?, signature=?, permission=?, employee_id=? WHERE id=?";
	var inserts = [req.body.username, req.body.password, req.body.date_created, req.body.signature, req.body.permission, req.body.employee_id, req.params.id];
	    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            req.flash("error", JSON.stringify(error));
            res.redirect("/users");
        }else if(results.affectedRows == 0){
            req.flash("error", "User not found!");
            res.redirect("/users");
        }else{
            req.flash("success", "User successfully updated!");
            res.redirect('/users');
        }
	});
});
// DELETE normal/admin user
router.delete("/users/:id", middleware.isLoggedIn, function(req, res){
	var mysql = req.app.get('mysql');
    var sql = "DELETE FROM User WHERE id = ?";
        // remember that these inserts are URL encoded
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log(results);
        if(error){
            req.flash("error", JSON.stringify(error));
            res.redirect("/users");
        }else if(results.affectedRows == 0){
            req.flash("error", "User not found!");
            res.redirect("/users");
        }
        else{
            res.status(200);
            req.flash("success", "User successfully deleted!");
            res.redirect('/Users');
        }
    });
});

module.exports = router;
