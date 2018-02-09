var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Greek", 
//         image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
//         description: "This is a huge granite hill, no bathroom.  No water, beautiful granite!"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     })


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //get all campgrounds from DB
    Campground.find({}, function(err, ALLCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:ALLCampgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    //create a new compground and save it to DB
    Campground.create(newCampground, function(err, campgroundaaaaaa){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        } 
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("news.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the YelpCamp Server has Started!!");
}); 