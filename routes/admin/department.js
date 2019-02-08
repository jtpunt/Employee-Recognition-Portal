var express    = require("express"),
    middleware = require("../../middleware"),
    sql        = require("../../sql"),
    router     = express.Router();

// Pie chart that shows how awards differ by departments across all locations
router.get("/", middleware.isLoggedIn, (req, res) =>{
    var context = {};
    var mysql = req.app.get('mysql');

    mysql.pool.query(sql.getDeptAwards, function(error, results, fields){
        if(error){
            req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.deptAwards = results;
            // console.log(context);
            res.render('admin/department/show', {deptAwards: results, scripts: ["/static/js/drawPieChart.js"]});
        }
    });
});
// Show Award Information by a specified Department
router.get("/:id", middleware.isLoggedIn, (req, res) => { 
	var context = {};
	var mysql = req.app.get('mysql');
	// validate the :id parameter sent in, can only be 'Human Resource Management', 'IT', 'Marketing', 'Purchasing', 'Research and Development', 'Finance', 'Production', 'Accounting'
	mysql.pool.query(sql.getDeptAwardsById, req.params.id, (error, results, fields) => {
		if(error){
            // req.flash("error", JSON.stringify(error));
            console.log(JSON.stringify(error));
            res.redirect("/admin");
        }else{
            context.deptAwards = results[0];
            console.log(context);
			// res.render('admin/department/show', context);
        }
	});
});
module.exports = router;
