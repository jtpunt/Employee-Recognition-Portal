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

	editUser: "UPDATE user SET username=?, password=?, signature=?, permission=? WHERE id=?;",

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
	            req.flash("success", "Flash works!");
				res.render(render, {results: results, stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	},
	findById: (req, res, sql, redirect, render, stylesheets, scripts) => {
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
	        	req.flash("success", "Flash works!");
	        	console.log(results);
				res.render(render, {results: results, stylesheets: [stylesheets], scripts: [scripts]});
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
	        	req.flash("success", "Flash works!");
				res.render(render, {results: results, stylesheets: [stylesheets], scripts: [scripts]});
	        }
		});
	},
	updateUser: (req, res, sql, redirect) => { 
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
            	req.flash("success", req.params.id + " successfully updated!");
            	res.redirect(redirect);
	        }
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
		var inserts = [req.body.user_id, req.body.award_id, req.body.employee_id, new Date().toLocaleString()];
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
	            genLatex(inserts[0], inserts[1], inserts[2], inserts[3]);
	            res.redirect(redirect);
	        }
	    });
	}
}
//create a latex file
function genLatex(userId, awardId, employeeId, grantDate)
{
   var fs = require('fs');
   var timeStamp = Date.now(); //get number of milliseconds since midnight, 1/1/1970
   var filename = './texFiles/' + timeStamp.toString() + '.tex';
   var outputFile = './pdfFiles/' + timeStamp.toString() + '.pdf';
   var award, description, email, fname, lname, grantorFname, grantorLname, dte;
 
   var d = new Date();
   var datestamp = d.toDateString(); 

   var mysql = require('../dbcon.js');
   var sql = "SELECT Award.title, Award.description, Employee.email as recip_email, Employee.fname as recip_fname, Employee.lname as recip_lname, empl.fname as grantor_fname, empl.lname as grantor_lname FROM " + 
      "Granted INNER JOIN Award ON Award.id = Granted.award_id INNER JOIN Employee ON Employee.id = Granted.employee_id " +
      "INNER JOIN User ON User.id = Granted.user_id INNER JOIN Employee empl ON empl.id = User.employee_id " +
      "WHERE  Granted.user_id = ? && Granted.award_id = ? && Granted.employee_id = ? && Granted.grant_date = ?;";
   //execute query and assign results to variables
   mysql.pool.query(sql, [ userId, awardId, employeeId, grantDate ], function (err, result, fields) {
      if(err){
         return console.error('error: ' + err.message);
      }
      console.log(result);
      award = result[0].title;
      description = result[0].description;
      email = result[0].recip_email;
      fname = result[0].recip_fname;
      lname = result[0].recip_lname;
      grantorFname = result[0].grantor_fname;
      grantorLname = result[0].grantor_lname;

      //create latex file with variable above
      var contents = `\\documentclass[12pt, letterpaper]{article} 
                  \\usepackage[utf8]{inputenc}
                  \\usepackage{float}
                  \\usepackage{graphicx}
                  \\graphicspath{ {/nfs/stak/users/perryjon/capstone/Employee-Recognition-Portal/images/} }
                  \\title{Employee Recognition Program}
                  \\author{${fname} ${lname}} 
                  \\date{${datestamp}}
                  \\begin{document}
                  \\maketitle
                  \\begin{center}
                  \\includegraphics[width=0.3\\linewidth]{trophy}
                  \\section*{You Won The ${award} Award!}
                  ${description}
                  \\section*{This award was granted from}
                  ${grantorFname} ${grantorLname}
                  \\end{center}
                  \\end{document}` 

      //Write latex file
      fs.writeFile(filename, contents, function (err) {
         if (err)
            throw err;
         //generate pdf file
         pdfGen(filename, outputFile, email); 
      });
      
   });

}

//generate pdf file from latex file
//see github.com/saadq/node-latex
function pdfGen(inputFile, outputFile, email) {
   console.log(inputFile);
   const latex = require('node-latex')
   console.log(latex);
   const fs = require('fs')
   const input = fs.createReadStream(inputFile)
   const output = fs.createWriteStream(outputFile)
   const pdf = latex(input)

   pdf.pipe(output)
   pdf.on('error', err => console.error(err))
   //once pdf is done generating call pdfEmail function
   pdf.on('finish', function () {
      console.log('PDF Generated!');
      pdfEmail(outputFile, email);
   });

}

//using SMTP email relay on mail.engr.oregonstate.edu
//see it.engineering.oregonstate.edu/setup-smtp-authorization
function pdfEmail(outputFile, email) 
{
   var usr = ""; //enter your oregon state email username here
   var pwd = ""; //enter you oregon state email password here
   var sender_email = ""; //enter your oregon state email address here

 
   var nodemailer = require('nodemailer');

   //setup mail host configuration
   var transporter = nodemailer.createTransport({
      host: "mail.engr.oregonstate.edu",
      port: 25,
      secure: false,
      auth: {
         user: usr, 
         pass: pwd 
      }
   });

   //Configure email
   var mailOptions = {
      from: sender_email,
      to: email,
      subject: 'Employee Recognition Award',
      text: 'Congratulations, you have won an award',
      attachments: [
         {
          filename: 'Award.pdf',
          path: outputFile 
  
         }
      ]

   };

   //send email
   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
         console.log(error);
      }
      else {
         console.log('Email sent: ' + info.response);
      }
   });
}
module.exports = sql