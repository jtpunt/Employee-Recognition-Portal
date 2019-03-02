var express    = require("express"),
    middleware = require("../middleware"),
    router     = express.Router();


// root route
router.get("/", function(req, res){
    // The render command by default will look for files in a folder called views
    var stylesheets = ["/static/css/home.css"];
    res.render("home", {stylesheets: stylesheets});
});

// accounts route
router.get('/login', function(req, res){
    res.render('login');
});
router.post('/login', function(req, res){
    console.log("IN LOGIN - POST");
    var mysql = req.app.get('mysql');
    var sql = "SELECT * FROM User WHERE username = ? AND password = ?;";
    var inserts = [req.body.user_name, req.body.user_pw]; 
    var redirect = "/admin";   
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
                    //redirect = "/";  // original code
                    redirect="/user";    // changed pard, normal user version
                 }
                req.session.username = results[0].username;
                req.flash("success", "Successfully logged in as " + results[0].username + ".");
                res.redirect(redirect);
            }
        }
    });
});
router.get("/logout", middleware.logout, function(req, res){

})
// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// handle sign up logic
router.post("/register", function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO `Accounts` (user_name, user_email, user_address, phone_number, user_pw, acc_type) VALUES (?, ?, ?, ?, ?, ?)";
    var inserts = [req.body.user_name, req.body.user_email, req.body.user_address, req.body.phone_number, req.body.user_pw, req.body.acc_type];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/search');
        }
	});
});
module.exports = router;