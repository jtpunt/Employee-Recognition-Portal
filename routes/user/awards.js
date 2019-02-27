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
    sql.find(req, res, sql.getAllAwards, render);
    
    
});  
    
    
    
    
module.exports = router;
