var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
/* QUERYING AWARDS ROUTES */
// SHOW ADMIN PAGE - Show admin dashboard
router.get("/", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    var render = "admin/dashboard";
    var stylesheets = ["/static/css/dashboard.css", "/static/css/userSearch.css"];
    var scripts = ["/static/js/drawPieChart.js", "/static/js/showHint.js", "/static/js/updateAdminPage.js", "/static/js/common.js"];
    sql.find(req, res, sql.getAllEmployees, redirect, render, stylesheets, scripts);
});
// Shows all Employees who have received a specified award: 'Employee of the Week' or 'Employee of the Month'
router.get("/:id", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    var render = "admin/employee/show";
    var stylesheets = ["/static/css/admin-employee.css"];
    var scripts = null;
    sql.find(req, res, sql.getAwardsById, redirect, render, stylesheets, scripts);
});

module.exports = router;
