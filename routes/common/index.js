var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
// Common route that is used in a fetch call for both admin and regular users.
// This route gets all employee names and ids, then returns them.
router.get("/", middleware.isLoggedIn, (req, res) => {
    console.log("in employee all route..");
    var redirect = "/user"
    if(req.session.admin){
    	redirect = "/admin";
    }
    sql.findAndRet(req, res, sql.getAllEmployees, redirect);
});

module.exports = router;