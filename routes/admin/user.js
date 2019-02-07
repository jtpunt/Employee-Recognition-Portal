var express    = require("express"),
    middleware = require("../../middleware"),
    router     = express.Router();
/* ADD/EDIT/DELETE users routes*/
// Will allow the admin to navigate to ADD/EDIT/DELETE users routes
router.get("/", middleware.isLoggedIn, (req, res) => {

});

// Add normal/admin user
router.get("/new", middleware.isLoggedIn, (req, res) => {
	// Takes you to the form to add a user
	res.render("admin/user/new");
});
// EDIT User
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
	var context = {};
	var mysql = req.app.get('mysql');
	var sql = "SELECT * FROM User WHERE id = ?;";
	// Takes you to the form to add a user
	mysql.pool.query(sql, req.params.id, (error, results, fields) => {
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
router.put("/:id", middleware.isLoggedIn, (req, res) => {
	var mysql = req.app.get('mysql');
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	var sql = "UPDATE user SET username=?, password=?, date_created=?, signature=?, permission=?, employee_id=? WHERE id=?";
	var inserts = [req.body.username, req.body.password, req.body.date_created, req.body.signature, req.body.permission, req.body.employee_id, req.params.id];
	    sql = mysql.pool.query(sql,inserts,(error, results, fields) => {
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
router.delete("/:id", middleware.isLoggedIn, (req, res) => {
	var mysql = req.app.get('mysql');
    var sql = "DELETE FROM User WHERE id = ?";
        // remember that these inserts are URL encoded
    var inserts = [req.params.id];
    sql = mysql.pool.query(sql,inserts, (error, results, fields) => {
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
