var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", middleware.isLoggedIn, function(req, results, res){
    
    console.log(results);
   
    
    var redirect = "/user";
    var render = "user/delete/show";
    var stylesheets = ["/static/css/admin-employee.css"];
    var scripts = [];
    sql.find(req, res, sql.getAllAwards, redirect, render, stylesheets, scripts);    
    
    
    
});  
    
    
    
    
module.exports = router;
