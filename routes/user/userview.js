var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", middleware.isLoggedIn,  function(req, res){
    res.render("user/userview/show");
});  
        
    
    
    
    
    
module.exports = router;