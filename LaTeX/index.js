
var latex = {
   //create a latex file
   genLatex: function(userId, awardId, employeeId, grantDate) {
      console.log("Grant date..", + grantDate);
      var fs = require('fs');
      var timeStamp = Date.now(); //get number of milliseconds since midnight, 1/1/1970
      var filename = './texFiles/' + timeStamp.toString() + '.tex';
      var outputFile = './pdfFiles/' + timeStamp.toString() + '.pdf' ;
      var sigFile = timeStamp.toString() + '.jpg'; //signature image file name
      var sigFilePath = './images/' + timeStamp.toString() + '.jpg'; //signature image file path
      var award, description, email, fname, lname, grantorFname, grantorLname, dte, signature;
    
      var d = new Date();
      var datestamp = d.toDateString(); 

      var mysql = require('../dbcon.js');
      var sql = "SELECT Award.title, Award.description, Employee.email as recip_email, Employee.fname as recip_fname, Employee.lname as recip_lname, empl.fname as grantor_fname, empl.lname as grantor_lname, User.signature FROM " + 
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
         signature = result[0].signature;
      
         var bufferBase64 = Buffer.from(result[0].signature, 'binary').toString();

        fs.writeFile(sigFilePath, bufferBase64, 'base64', function (err) {
          if (err)
            console.log(err);
          console.log("signature file created");

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
                     \\subsection*{${grantorFname} ${grantorLname}}
                     \\includegraphics[width=0.3\\linewidth]{${sigFile}}
                     \\end{center}
                     \\end{document}`

          //Write latex file
          fs.writeFile(filename, contents, function (err) {
            if (err)
              throw err;
            //generate pdf file
            latex.pdfGen(filename, outputFile, email, sigFilePath, latex.pdfEmail);
          });
        });
         
      });

   },

   //generate pdf file from latex file
   //see github.com/saadq/node-latex
   pdfGen: function(inputFile, outputFile, email, sigFilePath, func) {
      const latex = require('node-latex')
      const fs = require('fs')
      const input = fs.createReadStream(inputFile)
      const output = fs.createWriteStream(outputFile)
      const pdf = latex(input)

      pdf.pipe(output)
      pdf.on('error', err => console.error(err))
      //once pdf is done generating call pdfEmail function
      pdf.on('finish', function () {
        console.log('PDF Generated!');
        func(outputFile, email);
        latex.deleteFile(inputFile);
        latex.deleteFile(sigFilePath);
      });

   },

   //using SMTP email relay on mail.engr.oregonstate.edu
   //see it.engineering.oregonstate.edu/setup-smtp-authorization
   pdfEmail: function(outputFile, email) {
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
           latex.deleteFile(outputFile);
         }
      });
  },

  deleteFile: function (filePathName) {
    var fs = require('fs');
    fs.unlink(filePathName, function (err) {
      if (err) throw err;
      console.log(filePathName + " was deleted successfully");
    });

  }
}
module.exports = latex;