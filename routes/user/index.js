var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// Main user route which shows the user dashboard, where you can: 
// 	- change user name for the logged in user
// 	- delete granted awards given by the logged in user
router.get("/", middleware.isUser, (req, res) => {
	console.log("in main user route..");
	var redirect = "/user";
    var render = "user/dashboard";
    var stylesheets = ["/static/css/dashboard.css", "/static/css/userSearch.css"];
    var scripts = ["/static/js/common.js", "/static/js/updateUserPage.js"];
    sql.find(req, res, sql.getAllEmployees, redirect, render, stylesheets, scripts);
});
// This route is called by a fetch request and returns the logged in user
// their username and unique id to assist with updating their username
router.get("/currentUser", middleware.isUser, (req, res) => {
    console.log("in /user/currentUser route");
    var respObj = {
        "username": req.session.username,
        "id": req.session.user_id
    }
    res.write(JSON.stringify(respObj));
    res.end();
});
// This route handles any username updates for the current logged in user
router.put("/:id", middleware.isUser, (req, res) => {
    console.log("update request received");
    // same as admin/user route
    var redirect = "/user";
    sql.updateUser(req, res, sql.editUserName, redirect);
});
module.exports = router;
