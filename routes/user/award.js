var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

/* QUERYING AWARDS ROUTES */
// This route is called by a fetch request and it is used to
// show all awards granted by the logged in user
router.get("/", middleware.isUser, (req, res) => {
    var redirect = "/user";
    console.log("in main award route, returning data");
    sql.findByIdAndRet(req, res, sql.getAwardsByUserId, redirect);
});
// This route handles the creation of a new award that the logged in user has granted
router.post("/", middleware.isUser, (req, res) => {
    var redirect = "/user";
    sql.createAward(req, res, sql.setNewAward, redirect);
});
// This route handles the deletion of awards that the logged in user has granted
router.delete("/:id", middleware.isUser, (req, res) => {
    console.log("Delete request received: ", req.params.id);
    var redirect = "/user";
    sql.removeAward(req, res, sql.deleteAward, redirect);
});
module.exports = router;