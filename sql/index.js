var sql = {
	getAllAwards: "SELECT u.username AS granted_by, a.title, CONCAT(e.fname, ' ', e.lname) AS award_recipient, g.grant_date \
	FROM Granted g INNER JOIN User u ON g.user_id = u.id \
	INNER JOIN Award a ON g.award_id = a.id \
	INNER JOIN Employee e ON g.employee_id = e.id;",

	getAllAwardsById: "SELECT * FROM Awards WHERE id = ?;",
    // This sql statement counts how many awards there are in each department
	getDeptAwards: "SELECT COUNT(d.id) AS Award_Count, d.name AS Category FROM Department d \
	INNER JOIN Employee e on d.id = e.department_id \
	INNER JOIN Granted g ON e.id = g.employee_id \
	GROUP BY d.id;",

	getDeptAwardsById: "SELECT CONCAT(e.fname, ' ', e.lname) AS 'Employee Name', COUNT(e.id) AS 'Awards Received', d.name AS 'Department' \
	FROM Department d \
	INNER JOIN Employee e on d.id = e.department_id \
	INNER JOIN Granted g on e.id = g.employee_id \
	WHERE d.id = ? \
	GROUP BY e.id ",
	// This sql statement counts how many awards there are at each location
	getLocAwards: "SELECT COUNT(d.id) AS Award_Count, l.city AS Category FROM Department d \
	INNER JOIN Employee e on d.id = e.department_id \
	INNER JOIN Granted g ON e.id = g.employee_id \
	INNER JOIN Location l on d.location_id = l.id \
	GROUP BY l.city;",
	getLocAwardsById: "SELECT COUNT(d.id) AS Award_Count, l.city AS Category FROM Department d \
	INNER JOIN Employee e on d.id = e.department_id \
	INNER JOIN Granted g ON e.id = g.employee_id \
	INNER JOIN Location l on d.location_id = l.id \
	WHERE l.id = ? \
	GROUP BY l.city; ",
	find: (req, res, sql, redirect, render, stylesheets, scripts) => {
		var mysql = req.app.get('mysql');
		mysql.pool.query(sql, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            console.log(JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	            req.flash("success", "Flash works!");
				res.render(render, {awards: results, stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	},
	findById: (req, res, sql, redirect, render, stylesheets) => {
		mysql.pool.query(sql, req.params.id, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            console.log(JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	        	req.flash("success", "Flash works!");
				res.render(render, {awards: results[0], stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	}
}

module.exports = sql