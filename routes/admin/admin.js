var express    = require("express"),
    middleware = require("../../middleware"),
    router     = express.Router();
/* QUERYING AWARDS ROUTES */
// middleware.isLoggedIn - Assures us that an admin has navigated to this page
// SHOW ADMIN PAGE - shows which users created awards
router.get("/", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
    console.log("in root route");
	var sql = "SELECT u.username AS granted_by, a.title, CONCAT(e.fname, ' ', e.lname) AS award_recipient, g.grant_date "
		sql += "FROM Granted g INNER JOIN User u ON g.user_id = u.id ";
		sql += "INNER JOIN Award a ON g.award_id = a.id ";
		sql += "INNER JOIN Employee e ON g.employee_id = e.id;";
    // var sql = "SELECT * FROM Granted";
    mysql.pool.query(sql, (error, results, fields) => {
		if(error){
            req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.allAwards = results;
            console.log(context);
            req.flash("success", "Flash works!");
			res.render('admin/employee/show', {allAwards: results, stylesheets: ["/static/css/admin-employee.css"]});
        }
	});
});
// Shows all Employees who have received a specified award: 'Employee of the Week' or 'Employee of the Month'
router.get("/:id", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql'); 
	// validate the :id parameter sent in, can only be 'Employee of the Week' or 'Employee of the Month'
	var sql = "SELECT * FROM Awards WHERE id = ?";
    mysql.pool.query(sql, req.params.id, (error, results, fields) => {
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

module.exports = router;