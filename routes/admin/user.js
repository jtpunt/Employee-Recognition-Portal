var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
/* ADD/EDIT/DELETE users routes*/
// Will allow the admin to navigate to ADD/EDIT/DELETE users routes
router.get("/", middleware.isLoggedIn, (req, res) => {
    var redirect = "/user";
    var render = "admin/user/show";
    var stylesheets = null;
    var scripts = "/static/js/showHint.js";
    sql.find(req, res, sql.getAllUsers, redirect, render, stylesheets, scripts);
});
// :id - name of a user - to be used with the search feature
router.get("/:id", middleware.isLoggedIn, (req, res) => {
    console.log("fetch request received!");
    var redirect = "/user";
    var render = "admin/user/show";
    var stylesheets = null;
    var scripts = "/static/js/showHint.js";
    sql.findById(req, res, sql.getUserIdBySearch, redirect, render, stylesheets, scripts);
});
// Takes you to the form to add a user
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("admin/user/new");
});
// Add normal/admin user
router.post("/:id", middleware.isLoggedIn, (req, res) => {
    var redirect = "/users";
    var render = "admin/location/show";
    var stylesheets = null;
    var scripts = "/static/js/drawPieChart.js";
    sql.setUser(req, res, sql.setNewUser, redirect, render, stylesheets, scripts);
});
// EDIT User - Takes you to the form to edit a user
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
    var redirect = "/users/new";
    var render = "admin/user/edit";
    var stylesheets = null;
    var scripts = null;
    // Takes you to the form to add a user
    sql.findById(req, res, sql.getUserId, redirect, render, stylesheets, scripts);
});
// UPDATE normal/admin user
router.put("/:id", middleware.isLoggedIn, (req, res) => {
    var redirect = "/users";
    var render = "admin/user/edit";
    var stylesheets = null;
    var scripts = null;
    sql.updateUser(req, res, sql.editUser, redirect, stylesheets, scripts);
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// DELETE normal/admin user
router.delete("/:id", middleware.isLoggedIn, (req, res) => {
    var redirect = "/users";
    var render = "admin/user/edit";
    var stylesheets = null;
    var scripts = null;
    sql.removeUser(req, res, sql.deleteUser, redirect, stylesheets, scripts);
});
module.exports = router;
