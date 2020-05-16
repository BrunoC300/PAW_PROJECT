var express = require("express");
var router  = express.Router();
var User = require("../models/User");
var middleware = require("../middleware");

//User Main Page

router.get("/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        res.render("user/showUser", {user: foundUser});
    });
})


// EDIT User ROUTE
router.get("/:id/edit", function(req, res){
    Tecnico.findById(req.params.id, function(err, tecnicoFound){
        res.render("tecnicos/edit", {tecnico: tecnicoFound});
    });
});

// UPDATE User ROUTE
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.tecnico, function(err, tecnicoUpdate){
       if(err){
            console.log("Error: ",err);
           res.redirect("/:id/edit");
       } else {
           //redirect somewhere(show page)
           res.redirect("/" + req.params.id);
       }
    });
});


module.exports = router;