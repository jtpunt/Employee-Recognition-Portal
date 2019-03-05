var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Takes you to the user dashboard, where you can:
// 	- change user name for the logged in user
// 	- delete granted awards given by the logged in user
router.get("/", middleware.isLoggedIn, (req, res) => {
	console.log("in main user route..");
	var redirect = "/admin";
    var render = "user/dashboard";
    var stylesheets = ["/static/css/dashboard.css"];
    var scripts = ["/static/js/common.js", "/static/js/updateUserPage.js"];
    sql.find(req, res, sql.getAllUsers, redirect, render, stylesheets, scripts);
});
router.get("/all", middleware.isLoggedIn, (req, res) => {
    console.log("in user all route..");
    var redirect = "/admin";
    sql.findAndRet(req, res, sql.getAllUsers, redirect);
});
// Updates the username for the current logged in user
router.put("/", middleware.isLoggedIn, (req, res) => {
    // same as admin/user route
    var redirect = "/admin";
    sql.updateUser(req, res, sql.editUser, redirect);
});
// Handles deletion of awards that the logged in user has granted
router.delete("/", middleware.isLoggedIn, (req, res) => {

});
module.exports = router;
