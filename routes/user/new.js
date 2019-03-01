var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();
    
    
router.get("/", middleware.isLoggedIn,  function(req, res){
    res.render("user/new/show");
});  
        
router.post("/", middleware.isLoggedIn, (req, res) => {
    var redirect = "/user/new";
    sql.createAward(req, res, sql.setNewAward, redirect);
    // ERROR CHECK 1 - assure that the data sent in the requests body is not null
    // ERROR CHECK 2 - assure that the user_id, award_id, and employee_id passed in corresponds to an entry in the database
    // ERROR CHECK 3 - user must be logged in to get to this page
	// ERROR CHECK 4 - user who is logged  in MUST NOT be an admin
});
    
    
    
module.exports = router;
