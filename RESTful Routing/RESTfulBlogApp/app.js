var express    = require("express"),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser")
    
var app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient:true}, function (err) {
    if(err){
        console.log("ERROR!!!");
    }else{
        console.log("SUCCESS!!!");
    }
});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE SCHEMA CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    Created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


Blog.create({
    title: "test blog",
    image: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fanguerde.com%2Fpics%2Fmain%2F1%2F215926-cool-images.jpg&imgrefurl=http%3A%2F%2Fanguerde.com%2FTTF-215926-cool-images.html&docid=ZhQnhFaMR6JRvM&tbnid=fQ0SB04UMY0RkM%3A&vet=10ahUKEwia5-3tjqTYAhVhqlQKHRWXAPUQMwjCASgOMA4..i&w=1920&h=1200&bih=974&biw=1918&q=cool%20images&ved=0ahUKEwia5-3tjqTYAhVhqlQKHRWXAPUQMwjCASgOMA4&iact=mrc&uact=8",
    body: "HELLO THIS IS A BLOG POST!!!"
    
}, function(err, theBlog){
    if (err) {
        console.log("this is an error");
        console.log(err);
    } else {
        console.log(theBlog);
    }
})

//RESTful ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("ERROR!!!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
});
