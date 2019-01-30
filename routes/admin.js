var express    = require("express"),
    router     = express.Router();
/* QUERYING AWARDS ROUTES */
// SHOW ADMIN PAGE
router.get("/", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	function complete(){
		// render admin page - which will allow access to routes below
		// middle of screen will show table of awards that have been created, including who created the award and who received the award
		// ERROR CHECK 1 - Assure that an admin has navigated to this page
		res.render('admin/', context);
	}
});
// SHOW ALL Employees who have received 'Employee of the Week' or 'Employee of the Month'
router.get("/:id", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql'); 
	// validate the :id parameter sent in, can only be 'Employee of the Week' or 'Employee of the Month'
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// Pie chart that shows how awards differ by departments across all locations
router.get("/departments", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// Show Award Information by Department across all locations
router.get("/departments/:id", function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});


// Pie Chart That Shows how awards differ by Location
router.get("/location", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// Pie Chart that shows how awards differ by department at a specific location
router.get("/location/:id", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});


/* ADD/EDIT/DELETE users routes*/
// Add normal/admin user
router.get("/user", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	// Takes you to the form to add a user
});
// EDIT Listing
router.get("/user/:id", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
	// Takes you to the form to add a user
});
// UPDATE normal/admin user
router.put("/user/:id", function(req, res){
	// ERROR CHECK 1 - Assure that an admin has navigated to this page
});
// DELETE normal/admin user
router.delete("/user/:id", function(req, res){

});
module.exports = router;
function getAwards(res, mysql, context, id, complete){
	var sql = "SELECT * FROM Granted";
	// USER grants an Employee an award
	// USER =/= Employee, i.e., user should not be able to grant an award to themself
}