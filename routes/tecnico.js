var express = require("express");
var router  = express.Router();
var Tecnico = require("../models/Tecnico");
var middleware = require("../middleware");

// EDIT User ROUTE
router.get("/:id/edit", function(req, res){
    Tecnico.findById(req.params.id, function(err, tecnicoFound){
        res.render("tecnicos/edit", {tecnico: tecnicoFound});
    });
});

// UPDATE User ROUTE
router.put("/:id", function(req, res){
    Tecnico.findByIdAndUpdate(req.params.id, req.body.tecnico, function(err, tecnicoUpdate){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/" + req.params.id);
       }
    });
});

// DESTROY User ROUTE
router.delete("/:id", function(req, res){
    Tecnico.findByIdAndRemove(req.params.id, function(err){
       if(err){
            console.log("Error: ",err);
            res.redirect("/");
       } else {
           res.redirect("/");
       }
    });
 });

 
module.exports = router;
