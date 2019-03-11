var express        = require("express"),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    mysql          = require('./dbcon.js'),
    app            = express();

var PORT = 6598;

// requiring routes
var indexRoutes     = require("./routes/index"),
    adminRoutes     = require("./routes/admin/index"),
    adminDeptRoutes = require("./routes/admin/department"),
    adminLocRoutes  = require("./routes/admin/location"),
    adminUserRoutes = require("./routes/admin/user"), 
    userRoutes      = require("./routes/user/index"),
    awardRoutes     = require("./routes/user/award"),
    commonRoutes    = require("./routes/common/index");
    

app.set('view engine', 'ejs');
app.set('mysql', mysql);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('public')); // static directory is going to be our directory called public
app.use(methodOverride("_method")); // _method is what we are telling it to look for
app.use(flash()); // must be used before passport configuration

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.locals.moment = require('moment');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// w/e function we provide to it will be called on every route
app.use(function(req, res, next){
    // w/e we put in res.locals is what's available inside of our template
    res.locals.currentUser = req.session.username;
    res.locals.admin_user  = req.session.admin;
    res.locals.normal_user = req.session.normal_user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Shortens the route declarations
app.use("/", indexRoutes); // landing, login
app.use("/admin/departments", adminDeptRoutes); // returns all dept and indiv. dept data
app.use("/admin/locations", adminLocRoutes); // returns all loc and indiv. loc data
app.use("/admin/users", adminUserRoutes); // add/edit/delete user pages + user search feature
app.use("/admin", adminRoutes); // admin dashboard
app.use("/employees", commonRoutes); 
app.use("/user/awards", awardRoutes); // shows all awards, create awards
app.use("/user", userRoutes); // changing user name, deleting granted awards associated w/ logged in user
// app.use("/user", userRoutes1);  //  user landing page
// app.use("/user/awards", userAwardRoutes); // user version, showing all awards
// app.use("/user/profile", userProfileRoutes);  // edit user profile
// app.use("/user/new", userNewRoutes);   // add a new award
// app.use("/user/userview",userUVRoutes);   // view all user 
// app.use("/user/delete", userDeleteRoutes);  // delete an award
// app.use("/forget", forgetRoutes);
app.use(function(req,res){
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});
app.listen(PORT, process.env.IP, function(){
    console.log("server started on port ", PORT);
});

module.exports = app;
