var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Pie chart that shows how awards differ by departments across all locations
router.get("/", middleware.isAdmin, (req, res) => {
    console.log("in dept route..");
    var redirect = "/admin";
    var render = "admin/department/show";
    sql.findAndRet(req, res, sql.getDeptAwards, redirect);
});
router.get("/all", middleware.isAdmin, (req, res) => {
    console.log("in dept all route..");
    var redirect = "/admin";
    var render = "admin/department/show";
    sql.findAndRet(req, res, sql.getDeptIds, redirect);
});
// Show Award Information by a specified Department
router.get("/:id", middleware.isAdmin, (req, res) => { 
    console.log("IN INDV DEPT ROUTE")
    var redirect = "/admin";
    sql.findByIdAndRet(req, res, sql.getDeptAwardsById, redirect);
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
});
module.exports = router;
