var latex = require("../LaTeX");
var sql = {
	// CREATE
	setNewUser: "INSERT INTO User(username, password, secret, signature, permission, employee_id) VALUES (?, ?, ?, ?, ?, ?)", 

	setNewAward: "INSERT INTO Granted(user_id, award_id, employee_id, grant_date) VALUES (?, ?, ?, ?);",

	// RETRIEVE
	getAllAwards: "SELECT u.username AS granted_by, a.title, CONCAT(e.fname, ' ', e.lname) AS award_recipient, \
	DATE_FORMAT(g.grant_date,  '%b %e, %Y') AS grant_date \
	FROM Granted g INNER JOIN User u ON g.user_id = u.id \
	INNER JOIN Award a ON g.award_id = a.id \
	INNER JOIN Employee e ON g.employee_id = e.id \
	ORDER BY g.grant_date ASC;",

	getAllEmployees: "SELECT id, CONCAT(fname, ' ', lname) AS fullname FROM Employee ORDER BY fname, lname ASC;",

	getAwardsByUserId: "SELECT g.id, u.username AS granted_by, a.title, CONCAT(e.fname, ' ', e.lname) AS award_recipient, g.grant_date FROM Granted g \
	INNER JOIN Award a ON g.award_id = a.id \
	INNER JOIN User u on g.user_id = u.id \
	INNER JOIN Employee e ON g.employee_id = e.id \
	WHERE g.user_id = ?;",

	getAwardsByEmpId: "SELECT u.username AS granted_by, a.title, CONCAT(e.fname, ' ', e.lname) AS award_recipient, g.grant_date FROM Granted g \
	INNER JOIN Award a ON g.award_id = a.id \
	INNER JOIN User u on g.user_id = u.id \
	INNER JOIN Employee e ON g.employee_id = e.id \
	WHERE g.employee_id = ?;",

	getDeptIds: "SELECT id, name AS category FROM Department ORDER BY id ASC;",
	
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

	getLocAwardsById: "SELECT CONCAT(e.fname, ' ', e.lname) AS Category, COUNT(e.id) AS Award_Count FROM Department d \
	INNER JOIN Employee e on d.id = e.department_id \
	INNER JOIN Granted g ON e.id = g.employee_id \
	WHERE d.location_id = ? \
	GROUP BY e.id; ",

	getLocIds: "SELECT id, city AS category FROM Location ORDER BY id ASC;",

	getUsersByEmpId: "SELECT * FROM User WHERE employee_id = ? ORDER BY permission ASC;",

	getUserSigById: "SELECT signature FROM User WHERE id = ?;",

	getUserIdBySearch: "SELECT id, fname, lname FROM Employee WHERE CONCAT(fname, ' ', lname) LIKE CONCAT('%', ?, '%');",

	// UPDATE
	editUser: "UPDATE User SET username=?, password=?, secret=?, signature=?, permission=? WHERE id=?;",

	editUserName: "UPDATE User SET username=? WHERE id = ?;",
	// DELETE
	deleteUser: "DELETE FROM Employee WHERE id = ?;",
	
	deleteAward: "DELETE FROM Granted WHERE id = ?",

	// CREATE
	createUser: (req, res, sql, redirect) => {
		var formidable = require('formidable');
		var fs = require('fs');
		var mysql = req.app.get('mysql');
		var username = ""; // used to fix the scope problem below
		var form = new formidable.IncomingForm();
		form.parse(req, (err, fields, files) => {
			username=fields.username;
			if(!validateNums(Number(fields.permission), Number(fields.emp_select))){
				res.redirect(redirect);
			}else{
				if(files.signature.name === ""){ // no file has been sent
					console.log("no file sent");
	                var inserts = [fields.username, fields.password, fields.secret, null, fields.permission, fields.emp_select];
					mysql.pool.query(sql, inserts, (error, results, fields) => {
						if(error){
			            	req.flash("error", JSON.stringify(error));
			            	res.redirect(redirect);
				        }else if(results.affectedRows == 0){
			       			req.flash("error", username + ": not added!");
			            	res.redirect(redirect);
						}else{
			            	req.flash("success", username + " successfully added!");
			            	res.redirect(redirect);
				        }
					});
				}else{
					console.log("signature file uploaded");
					// '/nfs/stak/users/perryjon/testCapstone
					var oldpath = files.signature.path;
					// Read the file
			        fs.readFile(oldpath, 'base64', (err, data) => {
			            if (err) throw err;
		                // Delete the old file
			            fs.unlink(oldpath, (err) => { if (err) throw err; });
		                var inserts = [fields.username, fields.password, fields.secret, data, fields.permission, fields.emp_select];
						mysql.pool.query(sql, inserts, (error, results, fields) => {
							if(error){
				            	req.flash("error", JSON.stringify(error));
				            	res.redirect(redirect);
					        }else if(results.affectedRows == 0){
				       			req.flash("error", username + ": not found!");
				            	res.redirect(redirect);
							}else{
				            	req.flash("success", username + " successfully added!");
				            	res.redirect(redirect);
					        }
						});
		            });
				}
			}
		});
	},
	createAward: (req, res, sql, redirect) => {
		if(!validateNums(Number(req.body.award_id), Number(req.body.emp_select))){
			res.redirect(redirect);
		}else{
			var mysql = req.app.get('mysql');
			var inserts = [req.session.user_id, req.body.award_id, req.body.emp_select, require('moment')().format('YYYY-MM-DD hh:mm:ss')];
			mysql.pool.query(sql,inserts, function(error, results, fields){
		        if(error){
		            req.flash("error", JSON.stringify(error));
		            res.redirect(redirect);
		        }else if(results.affectedRows == 0){
		            req.flash("error", "Award not added!");
		            res.redirect(redirect);
		        }else{
		            req.flash("success", "Award successfully added!");
		            console.log(inserts[3]);
		            latex.genLatex(inserts[0], inserts[1], inserts[2], inserts[3]);
	               	console.log(inserts[3]);
		            res.redirect(redirect);
		        }
		    });
		}
	},
	// RETRIEVE
	find: (req, res, sql, redirect, render, stylesheets, scripts) => {
		var mysql = req.app.get('mysql');
		mysql.pool.query(sql, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	            // req.flash("success", "Flash works!");
				res.render(render, {results: results, stylesheets: stylesheets, scripts: scripts});
	        }
		});
	},
	findById: (req, res, sql, redirect, render, stylesheets, scripts) => {
		if(!validateNums(Number(req.params.id))){
			res.redirect(redirect);
		}else{
			var mysql = req.app.get('mysql');
			console.log(req.params.id);
			console.log(sql);
			mysql.pool.query(sql, req.params.id, (error, results, fields) => {
				if(error){
		            req.flash("error", JSON.stringify(error));
		            console.log(JSON.stringify(error));
		            res.redirect(redirect);
		        }else if(results[0] == undefined){
	        		req.flash("error", req.params.id + ": not found!");
	            	res.redirect(redirect);
	        	}else{
		        	console.log(results);
					res.render(render, {results: results, stylesheets: stylesheets, scripts: scripts});
		        }
			});
		}
	},
	findAndRet: (req, res, sql, redirect) => {
		var mysql = req.app.get('mysql');
		mysql.pool.query(sql, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	            // req.flash("success", "Flash works!");
	            console.log("in findAndRet with: ", results);
				res.write(JSON.stringify(results));
				res.end();
	        }
		});
	},
	findByIdAndRet: (req, res, sql, redirect) => {
		// admins can request loc/dept/employee data
		// users can request employee name data and view the awards they granted to other employees
		var id = req.params.id || req.session.user_id; 
		if(!validateNums(Number(id))){
			res.redirect(redirect);
		}else{
			var mysql = req.app.get('mysql');
			mysql.pool.query(sql, id, (error, results, fields) => {
				if(error){
		            req.flash("error", JSON.stringify(error));
		            console.log(JSON.stringify(error));
		            res.redirect(redirect);
		        }else if(results[0] == undefined){
	        		req.flash("error", id + ": not found!");
	            	res.redirect(redirect);
	        	}else{
		        	console.log(results);
					res.write(JSON.stringify(results));
					res.end();
		        }
			});
		}
	},
	// UPDATE
	updateUser: (req, res, sql, redirect) => { 
		// can try a get request with the query param passed in, or allow the user to update their name
		var id = req.params.id || req.session.user_id; 
		if(!validateNums(Number(id))){
			res.redirect(redirect);
		}else if(req.session.user_id){
			var username = ""; // used to fix the scope problem below
			var formidable = require('formidable');
			var mysql = req.app.get('mysql');
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files){
				username=fields.username; // fixes the scope problem of reassigning the session's username
				mysql.pool.query(sql, [fields.username, id], function(error, results, fields) {
					if(error){
		            	req.flash("error", JSON.stringify(error));
		            	res.redirect(redirect);
			        }else if(results.affectedRows == 0){
		       			req.flash("error", id + ": not found!");
		            	res.redirect(redirect);
					}else{
						req.session.username=username;
		            	req.flash("success", "Username successfully updated!");
		            	res.redirect(redirect);
			        }
				});
			});
		}else{
			var formidable = require('formidable');
			var fs = require('fs');
			var mysql = req.app.get('mysql');
			var form = new formidable.IncomingForm();
			form.parse(req, (err, fields, files) => {
				if(!validateNums(Number(fields.permission))){
					res.redirect(redirect);
				}else{
					if(files.signature.name === ""){ // no file has been sent
						console.log("no file sent");
		                var inserts = [fields.username, fields.password, fields.secret, fields.permission, id];
		                sql="UPDATE User SET username=?, password=?, secret=?, permission=? WHERE id=?;" // Removed signature db field so it is not overwritten with null
						mysql.pool.query(sql, inserts, (error, results, fields) => {
							if(error){
				            	req.flash("error", JSON.stringify(error));
				            	res.redirect(redirect);
					        }else if(results.affectedRows == 0){
				       			req.flash("error", id + ": not found!");
				            	res.redirect(redirect);
							}else{
				            	req.flash("success", id + " successfully updated!");
				            	res.redirect(redirect);
					        }
						});
					}else{
						// '/nfs/stak/users/perryjon/testCapstone
						var oldpath = files.signature.path;
						// Read the file
				        fs.readFile(oldpath, 'base64', (err, data) => {
				            if (err) throw err;
			                // Delete the old file
				            fs.unlink(oldpath, (err) => { if (err) throw err; });
			                var inserts = [fields.username, fields.password, fields.secret, data, fields.permission, id];
							mysql.pool.query(sql, inserts, (error, results, fields) => {
								if(error){
					            	req.flash("error", JSON.stringify(error));
					            	res.redirect(redirect);
						        }else if(results.affectedRows == 0){
					       			req.flash("error", id + ": not found!");
					            	res.redirect(redirect);
								}else{
					            	req.flash("success", id + " successfully updated!");
					            	res.redirect(redirect);
						        }
							});
			            });
					}
				}
			});
		}
	},
	// DELETE
	removeEmployee: (req, res, sql, redirect) => {
		var id = req.params.id;
		if(!validateNums(Number(id))){
			res.redirect(redirect);
		}else{
			var mysql = req.app.get('mysql');
			mysql.pool.query(sql, id, (error, results, fields) => {
				if(error){
	            	req.flash("error", JSON.stringify(error));
	            	res.redirect(redirect);
		        }else if(results.affectedRows == 0){
	       			req.flash("error", id + ": not found!");
	            	res.redirect(redirect);
				}else{
	            	// req.flash("success", id + " successfully deleted!");
	            	res.status(200).end();
		        }
			});
		}
	},
	removeAward: (req, res, sql, redirect) => {
		var id = req.params.id;
		if(!validateNums(Number(id))){
			res.redirect(redirect);
		}else{
			var mysql = req.app.get('mysql');
			mysql.pool.query(sql, id, (error, results, fields) => {
				if(error){
	            	req.flash("error", JSON.stringify(error));
	            	res.redirect(redirect);
		        }else if(results.affectedRows == 0){
	       			req.flash("error", id + ": not found!");
	            	res.redirect(redirect);
				}else{
	            	// req.flash("success", id + " successfully deleted!");
	            	res.status(200).end();
		        }
			});
		}
	}
}
function validateNums(...numbers){
	console.log("in validateNums with: ", numbers);
	var result = true;
	numbers.forEach((num) => {
		if(isNaN(num)){
			result = false;
		}
	});
	return result;
}
module.exports = sql