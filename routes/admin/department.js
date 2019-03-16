var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// This route is called by a fetch request and it returns the # of awards that
// were granted to each department. This data will be displayed in a 
// pie chart on the admin dashboard page.
router.get("/", middleware.isAdmin, (req, res) => {
    console.log("in dept route..");
    var redirect = "/admin";
    var render = "admin/department/show";
    sql.findAndRet(req, res, sql.getDeptAwards, redirect);
});
// This route is called by a fetch request and it returns all department names 
// and ids. This data will be used to populate a drop-down menu for selecting
// and viewing the # of awards of a specified department.
router.get("/all", middleware.isAdmin, (req, res) => {
    console.log("in dept all route..");
    var redirect = "/admin";
    var render = "admin/department/show";
    sql.findAndRet(req, res, sql.getDeptIds, redirect);
});
// This route is called by a fetch request and it returns the # of awards
// that were granted to the specified department. This data will be displayed 
// in a pie chart on the admin dashboard page.
router.get("/:id", middleware.isAdmin, (req, res) => { 
    console.log("IN INDV DEPT ROUTE")
    var redirect = "/admin";
    sql.findByIdAndRet(req, res, sql.getDeptAwardsById, redirect);
});
module.exports = router;
