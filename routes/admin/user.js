var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// This route handles the creation of a normal user or admin user
router.post("/", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    sql.createUser(req, res, sql.setNewUser, redirect);
});
// This route allows you to view the awards granted to a specified user
router.get("/:id", middleware.isAdmin, (req, res) => {
    console.log("in user/:id route");
    var redirect = "/admin";
    var render = "admin/user/show";
    var stylesheets = ["/static/css/awards-table.css"];
    var scripts = [];
    sql.findById(req, res, sql.getAwardsByEmpId, redirect, render, stylesheets, scripts);
});

// This route takes you to the form to edit a user
router.get("/:id/edit", middleware.isAdmin, (req, res) => {
    console.log("in edit route..");
    var redirect = "/admin/users/new";
    var render = "admin/user/edit";
    var stylesheets = [];
    var scripts = [];
    // Takes you to the form to add a user
    sql.findById(req, res, sql.getUsersByEmpId, redirect, render, stylesheets, scripts);
});
// This route handles any updates for a normal user or admin user
router.put("/:id", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    sql.updateUser(req, res, sql.editUser, redirect);
});
// This route handles any deletion of a normal user or admin user
router.delete("/:id", middleware.isAdmin, (req, res) => {
    console.log("delete request received");
    var redirect = "/admin";
    sql.removeEmployee(req, res, sql.deleteUser, redirect);
});
module.exports = router;

