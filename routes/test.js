var express    = require("express"),
    middleware = require("../middleware"),
    router     = express.Router();
    
router.get("/", function(req, res){
    res.render("user/test");
});


module.exports = router;