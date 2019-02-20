var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Takes you to the user dashboard, where you can:
// 	- change user name for the logged in user
// 	- delete granted awards given by the logged in user
router.get("/", middleware.isLoggedIn, (req, res) => {
	var redirect = "/admin";
    var render = "admin/dashboard";
    var stylesheets = ["/static/css/dashboard.css", "/static/css/userSearch.css"];
    var scripts = ["/static/js/drawPieChart.js", "/static/js/showHint.js", "static/js/updatePage.js"];
    res.render("user/dashboard");
});
// Updates the username for the current logged in user
router.put("/", middleware.isLoggedIn, (req, res) => {

});
// Handles deletion of awards that the logged in user has granted
router.delete("/", middleware.isLoggedIn, (req, res) => {

});
module.exports = router;
