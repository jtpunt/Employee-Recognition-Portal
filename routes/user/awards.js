var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", function(req, res){
     console.log("in awards route..");
    res.render("user/awards/show");
});  
    
    
    
    
module.exports = router;
