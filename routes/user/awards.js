var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", function(req, res){
    //console.log("in awards route..");
    var render="user/awards/show";
   
    //var render = "admin/employee/show";
    //var stylesheets = ["/static/css/admin-employee.css"];
    //var scripts = [];
    
    console.log("in dept route..");
    var redirect = "/user";
   
    //sql.findAndRet(req, res, sql.getDeptAwards, redirect);
    
    sql.find(req, res, sql.getAllAwards, render, redirect);
    
    
});  
    
    
    
    
module.exports = router;
