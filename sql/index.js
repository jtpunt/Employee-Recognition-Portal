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

	getDeptAwardsById: "SELECT CONCAT(e.fname, ' ', e.lname) AS Category, COUNT(e.id) AS Award_Count  \
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
	setNewUser: "INSERT INTO User (id, username, password, date_created, signature, permission, employee_id) VALUES (?, ?, ?, ?, ?, ?, ?);", 
	updateUser: "UPDATE user SET username=?, password=?, date_created=?, signature=?, permission=?, employee_id=? WHERE id=?",
	getAllUsers: "SELECT id, fname, lname FROM Employee ORDER BY fname, lname ASC;",
	getUserId: "SELECT id, fname, lname FROM Employee WHERE CONCAT(fname, ' ', lname) LIKE CONCAT('%', ?, '%');",
	find: (req, res, sql, redirect, render, stylesheets, scripts) => {
		var mysql = req.app.get('mysql');
		mysql.pool.query(sql, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            console.log(JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	            req.flash("success", "Flash works!");
	            console.log(results);
				res.render(render, {results: results, stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	},
	findById: (req, res, sql, redirect, render, stylesheets, scripts) => {
		var mysql = req.app.get('mysql');
		console.log(req.params.id);
		mysql.pool.query(sql, req.params.id, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            console.log(JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	        	req.flash("success", "Flash works!");
				res.render(render, {results: results, stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	},
	setUser: (req, res, sql, redirect, render, stylesheets, scripts) => {
		var mysql = req.app.get('mysql');
		var inserts = [req.body.username, req.body.password, req.body.date_created, req.body.signature, req.body.permission, req.body.employee_id, req.params.id];
		mysql.pool.query(sql, req.params.id, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            console.log(JSON.stringify(error));
	            res.redirect(redirect);
	        }else if(results.affectedRows == 0){
            	req.flash("error", "User not added!");
            	res.redirect(redirect);
			}else{
	        	req.flash("success", "Flash works!");
				res.render(render, {results: results, stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	}
}

module.exports = sql