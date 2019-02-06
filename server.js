var express        = require("express"),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    mysql          = require('./dbcon.js'),
    app            = express();

var PORT = 5004;

// requiring routes
var indexRoutes   = require("./routes/index"),
    awardRoutes   = require("./routes/awards"),
    adminRoutes   = require("./routes/admin");

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
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// Shortens the route declarations
app.use("/", indexRoutes); // landing page, login page, register page, search page, accounts page.
app.use("/admin", adminRoutes);
app.use("/award", awardRoutes);
app.listen(PORT, process.env.IP, function(){
    console.log("server started on port ", PORT);
});

module.exports = app;
