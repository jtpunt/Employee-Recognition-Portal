var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    // Takes you to the form to add a user
router.get("/new", middleware.isAdmin, (req, res) => {
    console.log("IN NEW ROUTE..");
    res.render("admin/user/new");
});
/* ADD/EDIT/DELETE users routes*/
// Will allow the admin to navigate to ADD/EDIT/DELETE users routes
router.get("/", middleware.isAdmin, (req, res) => {
    var redirect = "/admin/user";
    var render = "admin/user/show";
    var stylesheets = ["/static/css/userSearch.css"];
    var scripts = ["/static/js/showHint.js"];
    sql.find(req, res, sql.getAllUsers, redirect, render, stylesheets, scripts);
});
// Add normal/admin user
router.post("/", middleware.isAdmin, (req, res) => {
    var redirect = "/admin/users";
    var render = "admin/user/show";
    var stylesheets = null;
    var scripts = ["/static/js/drawPieChart.js"];
    sql.setUser(req, res, sql.setNewUser, redirect, render, stylesheets, scripts);
});
// // :id - name of a user - to be used with the search feature
// router.get("/:id", middleware.isAdmin, (req, res) => {
//     console.log("fetch request received!");
//     var redirect = "/admin/users";
//     var render = "admin/user/show";
//     var stylesheets = null;
//     var scripts = ["/static/js/showHint.js"];
//     sql.findById(req, res, sql.getUserIdBySearch, redirect, render, stylesheets, scripts);
// });
// EDIT User - Takes you to the form to edit a user
router.get("/:id/edit", middleware.isAdmin, (req, res) => {
    console.log("in edit route..");
    var redirect = "/admin/users/new";
    var render = "admin/user/edit";
    var stylesheets = [];
    var scripts = [];
    // Takes you to the form to add a user
    sql.findById(req, res, sql.getUserById, redirect, render, stylesheets, scripts);
});
// UPDATE normal/admin user
router.put("/:id", middleware.isAdmin, (req, res) => {
    var redirect = "/admin/users";
    sql.updateUser(req, res, sql.editUser, redirect);
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// DELETE normal/admin user
router.delete("/:id", middleware.isAdmin, (req, res) => {
    var redirect = "/admin/users";
    sql.removeUser(req, res, sql.deleteUser, redirect);
});
module.exports = router;
