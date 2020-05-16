// --------------------------------------------SETUP-------------------------------------------------

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash = require('req-flash');
    User = require("./models/User"),
    Tecnico = require("./models/Tecnico"),
    methodOverride = require("method-override");

mongoose
    .connect('mongodb://localhost:27017/Covid', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

var app = express();
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


var authRoutes = require("./routes/authentication"),
    tecnicoRoutes = require("./routes/tecnico"),
    userRoutes = require("./routes/user");


app.use(require("express-session")({
    secret: "SecretTesting",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.use(flash());

/*app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
});*/

app.use(authRoutes);
app.use(tecnicoRoutes);
app.use(userRoutes);


app.listen(3000, function () {
    console.log("Server Has Started!");
});
