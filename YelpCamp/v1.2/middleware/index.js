//all the meddleware goes here
var Campground = require("../models/campground");
var Comments = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
         Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("back");
    } 
}

middlewareObj.checkCommentsOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
         Comments.findById(req.params.comment_id, function(err, foundComments){
            if(err) {
                res.redirect("back");
            } else {
                //does user own the campground?
                if(foundComments.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    } 
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};


module.exports = middlewareObj;