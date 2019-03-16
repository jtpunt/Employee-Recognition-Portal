var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Main admin route which shows the admin dashboard
// This route queries the database to return all information on granted awards such as:
// 	- The name of who granted the award
//  - The title of the award - "Employee of the Week" or "Employee of the Month"
//  - The name of who received the award
//  - The date the award was granted
// This data is then used to populate a table on the admin dashboard page.
router.get("/", middleware.isAdmin, (req, res) => {
    var redirect = "/admin";
    var render = "admin/dashboard";
    var stylesheets = ["/static/css/dashboard.css", "/static/css/userSearch.css", "/static/css/awards-table.css"];
    var scripts = ["/static/js/drawPieChart.js", "/static/js/showHint.js", "/static/js/updateAdminPage.js", "/static/js/common.js"];
    sql.find(req, res, sql.getAllAwards, redirect, render, stylesheets, scripts);
});
// // Shows all Employees who have received a specified award: 'Employee of the Week' or 'Employee of the Month'
// router.get("/:id", middleware.isAdmin, (req, res) => {
//     var redirect = "/admin";
//     var render = "admin/employee/show";
//     var stylesheets = ["/static/css/admin-employee.css"];
//     var scripts = null;
//     sql.find(req, res, sql.getAwardsById, redirect, render, stylesheets, scripts);
// });

module.exports = router;
