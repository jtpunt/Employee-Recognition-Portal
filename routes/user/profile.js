var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", function(req, res){
    res.render("user/profile/show");
});  
        
    
    
    
    
    
module.exports = router;
