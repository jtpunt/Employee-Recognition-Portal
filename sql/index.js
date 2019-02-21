var latex = require("../LaTeX");
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

	getLocAwardsById: "SELECT CONCAT(e.fname, ' ', e.lname) AS Category, COUNT(e.id) AS Award_Count FROM Department d \
	INNER JOIN Employee e on d.id = e.department_id \
	INNER JOIN Granted g ON e.id = g.employee_id \
	WHERE d.location_id = ? \
	GROUP BY e.id; ",

	setNewUser: "INSERT INTO User(username, password, signature, permission, employee_id) VALUES (?, ?, ?, ?, ?)", 

	editUser: "UPDATE User SET username=?, password=?, signature=?, permission=? WHERE id=?;",

	getAllUsers: "SELECT id, fname, lname FROM Employee ORDER BY fname, lname ASC;",

	getUserById: "SELECT * FROM User WHERE id = ?;",

	getUserIdBySearch: "SELECT id, fname, lname FROM Employee WHERE CONCAT(fname, ' ', lname) LIKE CONCAT('%', ?, '%');",

	deleteUser: "DELETE FROM Employee WHERE id = ?;",

	setNewAward: "INSERT INTO Granted(user_id, award_id, employee_id, grant_date) VALUES (?, ?, ?, ?);",
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
		var mysql = req.app.get('mysql');
		console.log(req.params.id);
		console.log(sql);
		var fs = require('fs');
		var newpath = '/home/jonathan/Documents/Employee-Recognition-Portal/public/images/test.img'
		mysql.pool.query(sql, req.params.id, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            console.log(JSON.stringify(error));
	            res.redirect(redirect);
	        }else if(results[0] == undefined){
        		req.flash("error", req.params.id + ": not found!");
            	res.redirect(redirect);
        	}else{
	        	// req.flash("success", "Flash works!");
	        	console.log(results);
	        	// results[0].signature = JSON.stringify(results[0].signature);
	        	// fs.writeFile(newpath, results[0].signature, (err) => {if (err) throw err});
				res.render(render, {results: results, stylesheets: stylesheets, scripts: scripts});
	        }
		});
	},
	setUser: (req, res, sql, redirect, render, stylesheets, scripts) => {
		var mysql = req.app.get('mysql');
		var inserts = [String(req.body.username), String(req.body.password), req.body.signature, Number(req.body.permission), Number(req.body.employee_id)];
		inserts.forEach((insert) => {
			console.log(typeof insert);
		});
		mysql.pool.query(sql, inserts, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            res.redirect(redirect);
	        }else if(results.affectedRows == 0){
       			req.flash("error", req.params.id + ": not found!");
            	res.redirect(redirect);
			}else{
	        	// req.flash("success", "Flash works!");
				res.render(render, {results: results, stylesheets: stylesheets, scripts: scripts});
	        }
		});
	},
	updateUser: (req, res, sql, redirect) => { 
		var formidable = require('formidable');
		var fs = require('fs');
		var mysql = req.app.get('mysql');
		var form = new formidable.IncomingForm();
		form.parse(req, (err, fields, files) => {
			var fileData = undefined;
			var oldpath = files.signature.path;
			// '/nfs/stak/users/perryjon/testCapstone
			var newpath = '/home/jonathan/Documents/Employee-Recognition-Portal/public/images/' + files.signature.name;
			// Read the file
	        fs.readFile(oldpath, 'base64', (err, data) => {
	            if (err) throw err;
	            // Write the file
	            fs.writeFile(newpath, data, 'base64', (err) => {
	                if (err) throw err;
	                console.log(typeof data);
	                // Delete the old file
		            fs.unlink(oldpath, (err) => { if (err) throw err; });
	                // console.log("fileData: " +  data);
	                var inserts = [fields.username, fields.password, data, fields.permission, req.params.id];
					mysql.pool.query(sql, inserts, (error, results, fields) => {
						if(error){
			            	req.flash("error", JSON.stringify(error));
			            	res.redirect(redirect);
				        }else if(results.affectedRows == 0){
			       			req.flash("error", req.params.id + ": not found!");
			            	res.redirect(redirect);
						}else{
			            	req.flash("success", req.params.id + " successfully updated!");
			            	res.redirect(redirect);
				        }
					});
	            });
	        }); 
		});
	},
	removeUser: (req, res, sql, redirect) => {
		var mysql = req.app.get('mysql');
		var inserts = [req.body.username, req.body.password, req.body.date_created, req.body.signature, req.body.permission, req.body.employee_id, req.params.id]; 
		mysql.pool.query(sql, req.params.id, (error, results, fields) => {
			if(error){
            	req.flash("error", JSON.stringify(error));
            	res.redirect(redirect);
	        }else if(results.affectedRows == 0){
       			req.flash("error", req.params.id + ": not found!");
            	res.redirect(redirect);
			}else{
            	req.flash("success", req.params.id + " successfully deleted!");
            	res.redirect(redirect);
	        }
		});
	},
	createAward: (req, res, sql, redirect) => {
		var mysql = req.app.get('mysql');
		var inserts = [req.body.user_id, req.body.award_id, req.body.employee_id, require('moment')().format('YYYY-MM-DD hh:mm:ss')];
		mysql.pool.query(sql, inserts,function(error, results, fields){
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
	},
	findAndRet: (req, res, sql, redirect) => {
		var mysql = req.app.get('mysql');
		mysql.pool.query(sql, (error, results, fields) => {
			if(error){
	            req.flash("error", JSON.stringify(error));
	            res.redirect(redirect);
	        }else{
	            // req.flash("success", "Flash works!");
	            console.log(results);
				res.write(JSON.stringify(results));
				res.end();
	        }
		});
	}
}
module.exports = sql