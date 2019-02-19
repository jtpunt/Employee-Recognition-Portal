var middleware = {
	isLoggedIn(req, res, next){
	    // if(req.isAuthenticated()){
	    //     return next();
	    // }
	    // req.flash("error", "You need to be logged in to do that");
	    // res.redirect("/login");
	    return next();
	},
	isAdmin(req, res, next){
		if(req.session.admin){
	        return next();
	    }
	    req.flash("error", "You need to be loggeded in to do that");
	    res.redirect("/login");
	}
}
module.exports = middleware