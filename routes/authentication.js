var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");
var Tecnico = require("../models/Tecnico");

router.get("/", function (req, res) {
    res.render("landing");
});


// -------------------------------------------AUTH ROUTES---------------------------------------------------

router.get("/register", function (req, res) {
    res.render("register");
});
router.post("/register", function (req, res) {
/* LADO ADMIN PARA ADICIONAR MAIS TARDE
    if(req.body.adminCode === 'secreto123'){
        newUser.isAdmin = true; 
    }*/
    //Não se envia a password em conjunto com o username, pois assim o "user.register" faz Hash da password,
    // criando mais proteção.
    var newUser = new User(
        {
            username: req.body.username,
            ultimoNome: req.body.ultimoNome,
            email: req.body.email,
            contacto: req.body.contacto,
            sexo: req.body.sexo,
            morada: req.body.morada,
            
        });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
            req.flash('Registado com sucesso como' + primeiroNome+" "+ultimoNome);
        });
    });
});

router.post("/registerTecnico", function (req, res) {
    var newTec = new Tecnico(
        {
            primeiroNome: req.body.primeiroNome,
            ultimoNome: req.body.ultimoNome,
            email: req.body.email,
            contacto: req.body.contacto,
            sexo: req.body.sexo,
            funcao: req.body.funcao
        });
    Tecnico.register(newTec, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
            req.flash('Registado com sucesso como' + primeiroNome+" "+ultimoNome);
        });
    });
});



// LOGIN FORM


router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res) {
    });

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;