var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Takes you to the user dashboard, where you can:
// 	- change user name for the logged in user
// 	- delete granted awards given by the logged in user
router.get("/", middleware.isLoggedIn, (req, res) => {
	console.log("in main user route..");
	var redirect = "/user";
    var render = "user/dashboard";
    var stylesheets = ["/static/css/dashboard.css", "/static/css/userSearch.css"];
    var scripts = ["/static/js/common.js", "/static/js/updateUserPage.js"];
    sql.find(req, res, sql.getAllUsers, redirect, render, stylesheets, scripts);
});
router.get("/all", middleware.isLoggedIn, (req, res) => {
    console.log("in user all route..");
    var redirect = "/user";
    sql.findAndRet(req, res, sql.getAllUsers, redirect);
});
router.get("/currentUser", middleware.isLoggedIn, (req, res) => {
    console.log("in /user/currentUser route");
    var respObj = {
        "username": req.session.username,
        "id": req.session.user_id
    }
    res.write(JSON.stringify(respObj));
    res.end();
});
// Updates the username for the current logged in user
router.put("/:id", middleware.isLoggedIn, (req, res) => {
    console.log("update request received");
    // same as admin/user route
    var redirect = "/user";
    sql.updateUser(req, res, sql.editUserName, redirect);
});
module.exports = router;
