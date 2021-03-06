var express    = require("express"),
    middleware = require("../middleware"),
    router     = express.Router();


// root route
router.get("/", function(req, res){
    // The render command by default will look for files in a folder called views
    var stylesheets = ["/static/css/home.css"];
    var scripts = ["static/js/go.js", "/static/js/drawERD.js"];
    res.render("home", {stylesheets: stylesheets, scripts: scripts});
});

// accounts route
router.get('/login', function(req, res){
    res.render('login');
});
// This route handles the process of logging in a user to the website by
// querying the database to make sure that the user exists in the database.
// If the user does exist and their password is correct, we see if 
// they're an admin user or regular user and then redirect them to their 
// main dashboard page
router.post('/login', function(req, res){
    console.log("IN LOGIN - POST");
    var mysql = req.app.get('mysql');
    var sql = "SELECT * FROM User WHERE username = ? AND password = ?;";
    var inserts = [req.body.user_name, req.body.user_pw]; 
    var redirect = "/admin"; // Go to admin page by default
    console.log(inserts);     
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log(results);
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            if (results[0] == undefined) {
                req.flash("error", "User not found!");
                res.redirect('/login');
            }
            else {
                console.log(results);
                if(results[0].permission){ // admin user
                    req.session.admin = true;
                    req.session.normal_user = false;
                }else{ // normal user
                    req.session.normal_user = true;
                    req.session.admin = false;
                    req.session.user_id = results[0].id;
                    redirect="/user"; // Go to user dashboard
                 }
                req.session.username = results[0].username;
                req.flash("success", "Successfully logged in as " + results[0].username + ".");
                res.redirect(redirect);
            }
        }
    });
});
// This route handles the process for logging a user out, where the request and response
// objects are passed to the middleware.logout function, where all of the logic to handle
// logging out is stored
router.get("/logout", middleware.logout, function(req, res){

})
// This route shows the forgot password form where the user can recover their password
router.get("/forgot", function(req, res){
    console.log("Show forgot form");
    res.render("forgot");
});
// This route handles the process for resetting a user's password if they cannot log in.
// To reset the password, the user must enter in their new password and enter in the secret
// they set when they created their account
router.post("/forgot", function(req, res){
    var mysql = req.app.get('mysql');
    var stylesheets = null;
    var scripts = null;
    var redirect = "/";
    var sql = "SELECT id FROM User WHERE username = ? AND secret = ?;";
    console.log("in post /forgot");
    var inserts = [req.body.username, req.body.secret]; 
    var inserts1 = [req.body.password1, req.body.password2];
    // make sure the user is in the database first before trying to update their password
    mysql.pool.query(sql, inserts, (error, results, fields) => {
        if(error){
            req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect(redirect);
        }else if(results[0] == undefined){
            req.flash("error", "username not found!");
            res.redirect(redirect);
        }else{ // user was successfully found, proceed to reset password   
            console.log(results);
            // make sure the passwords the user entered are the same
            if(inserts1[0] !== inserts1[1]){ 
                req.flash("error", "Passwords entered do not match!");
                res.redirect(redirect);
            }
            var sql = "UPDATE User SET password=? WHERE id=?;"
            var inserts = [req.body.password1, results[0].id];
            mysql.pool.query(sql, inserts, (error, results, fields) => {
                if(error){
                    req.flash("error", JSON.stringify(error));
                    res.redirect(redirect);
                }else if(results.affectedRows == 0){
                    req.flash("error",  "password not updated");
                    res.redirect(redirect);
                }else{
                    console.log(results);
                    req.flash("success", "Password successfully updated!");
                    res.redirect(redirect);
                }
            });
        }
    });
});
module.exports = router;