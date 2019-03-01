var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", middleware.isLoggedIn, function(req, res){
    
    var render="user/delete/show";
   
    
    
    
});  
    
    
    
    
module.exports = router;
