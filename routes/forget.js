var express    = require("express"),
    middleware = require("../middleware"),
    router     = express.Router();
    
    
router.get("/", function(req, res){
    
    res.render("forget");
});  









module.exports = router;