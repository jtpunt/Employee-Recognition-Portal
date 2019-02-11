var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
/* QUERYING AWARDS ROUTES */
// middleware.isLoggedIn - Assures us that an admin has navigated to this page
// SHOW ADMIN PAGE - shows which users created awards
router.get("/", middleware.isLoggedIn, (req, res) => {
    var redirect = "/admin";
    var render = "admin/employee/show";
    var stylesheets = "/static/css/admin-employee.css";
    var scripts = null;
    sql.find(req, res, sql.getAllAwards, redirect, render, stylesheets, scripts);
});
// Shows all Employees who have received a specified award: 'Employee of the Week' or 'Employee of the Month'
router.get("/:id", middleware.isLoggedIn, (req, res) => {
	var mysql = req.app.get('mysql'); 
    var redirect = "/admin";
    var render = "admin/employee/show";
    var stylesheets = "/static/css/admin-employee.css";
    var scripts = null;
    sql.find(req, res, sql.getAllAwardsById, redirect, render, stylesheets, scripts);
});

module.exports = router;
