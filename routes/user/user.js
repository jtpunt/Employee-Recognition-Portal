var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
router.get("/", (req, res) => {
   res.render("user/landing");
});    
    
    
    
    
    
module.exports = router;
