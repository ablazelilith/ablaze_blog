const express = require("express");
const ejs = require('ejs');
const path = require('path'); // native node module
const multer  = require('multer');
const { log } = require("console");

const port = 3000;
const date = require(__dirname + "/script/date.js");
const blog = require(__dirname + "/script/blog-content.js");
const author = require(__dirname + "/script/authors.js");

// **************** Upload Image (start) ****************
// 4) Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        // ***** Solution 1 | input name and date
        // cb(null, file.fieldname + '_' +  Date.now() + path.extname(file.originalname));

        // ***** Solution 2 | file name and date
        let temp_file_arr = file.originalname.split(".");
        let temp_file_name = temp_file_arr[0];
        let temp_file_ext = temp_file_arr[1];
        cb(null, temp_file_name + '_' +  Date.now() + '.' + temp_file_ext);
    }
});
// 5) Init Upload
const upload = multer({ storage: storage }).single('postImage');
// **************** Upload Image (end) ****************


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const homeStartContent = {
    title: "Hi, welcome to Blaze!",
    content: "Your blog is empty at the moment. Share your unique, memorable experience today and immediately get 100 free flare points that you can accumulate and award to your favorite blog authors. Let's get blogging!"
};
const aboutContent = "Ablaze Blog is an online digital blogging platform where you can share your unique, memorable experience with your family, friends, and other people across the world.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let blogName = "My Blog";
const blogpostTitles = [];
const blogpostPosts = [];
const blogpostAuthors = [];
const authorContactLinks = [];
const blogpostDates = [];
const blogpostIDs = [];
const postImages = [];

const authors = author.getAuthors();
const blogposts = blog.getBlogposts();
const userposts = [];

// --------------- Home ---------------
app.get("/", (req, res) => {

    res.render("home", { 
        homeContent: homeStartContent, 
        blogposts: blogposts, 
        blogpostPost: blogpostPosts, 
        blogpostTitle: blogpostTitles, 
        blogpostAuthor: blogpostAuthors, 
        authorContactLink: authorContactLinks,
        blogpostDate: blogpostDates,
        author: authors, 
    });

});

app.post("/", (req, res) => {

});

// --------------- Latest Blogs ---------------
app.get("/latest-blogs", (req, res) => {

    res.render("blogs", { 
        homeContent: homeStartContent, 
        blogposts: blogposts, 
        blogpostPost: blogpostPosts, 
        blogpostTitle: blogpostTitles, 
        blogpostAuthor: blogpostAuthors, 
        blogpostDate: blogpostDates 
    });

});

// --------------- Authors ---------------
app.get("/favorite-authors", (req, res) => {

    res.render("authors", {
        author: authors, 
        blogpostPost: blogpostPosts
    });

});

// --------------- My Blog ---------------
app.get("/my-blog", (req, res) => {

    console.log(userposts);

    res.render("my-blog", { 
        blogName: blogName, 
        homeContent: homeStartContent, 
        blogposts: blogposts, 
        blogpostPost: blogpostPosts, 
        blogpostTitle: blogpostTitles, 
        blogpostAuthor: blogpostAuthors, 
        authorContactLink: authorContactLinks,
        blogpostDate: blogpostDates,
        blogpostID: blogpostIDs,
        postImage: postImages
    });

});

// --------------- New Blog ---------------
app.get("/new-blog", (req, res) => {

    res.render("new-blog", { 
        blogName: blogName, 
        blogpostPost: blogpostPosts
    });

});

app.post("/new-blog", (req, res) => {

    let newBlogName = req.body.blogName;

    if (newBlogName == "My Blog") {
        // blogName.push(newBlogName);
        blogName = newBlogName;

        res.redirect("/my-blog");
    }

    // ********** Node.js Image Upload Script **********
    upload(req, res, (err) => {
        if (err) {
            // res.render('new-blog', {
            //     msg: err
            // });
            console.log(err);
        } else {
            console.log(req.file);
            // res.send('Post image was successfully uploaded!');

            let newPostImage = req.file.filename;
            postImages.push(newPostImage);
            // res.redirect('/my-blog');

            // let newBlogName = req.body.blogName;
            let newBlogpostTitle = req.body.blogpostTitle.toLowerCase();
            // let newBlogpostTitle = req.body.blogpostTitle;
            let newBlogpost = req.body.blogpostText;
            let newBlogpostAuthor = req.body.blogpostAuthor;
            let newauthorContactLink = req.body.authorContactLink;
            let newBlogpostDate = date.getDate();
            let newBlogpostID = blogpostTitles.length + 1;

            let newBlogpostz = {
                id: userposts.length + 1,
                title: req.body.blogpostTitle.toLowerCase(),
                text: req.body.blogpostText,
                image: req.file.filename,
                author: req.body.blogpostAuthor,
                authorLink: req.body.authorContactLink,
                date: date.getDate(),
            }

            userposts.push(newBlogpostz);

            // console.log(newBlogpost);

            blogpostTitles.push(newBlogpostTitle);
            blogpostPosts.push(newBlogpost);
            blogpostAuthors.push(newBlogpostAuthor);
            blogpostDates.push(newBlogpostDate);
            authorContactLinks.push(newauthorContactLink);
            blogpostIDs.push(newBlogpostID);

            // blogName.push(newBlogName);
            res.redirect("/my-blog");
        }
    });

});

app.post("/new-blog-name", (req, res) => {

    let newBlogName = req.body.blogName;

    if (newBlogName == "My Blog") {
        
    } else {
        blogName = newBlogName;
    }

    res.redirect("/my-blog");

});

// --------------- User Account ---------------
app.get("/user-account", (req, res) => {

    res.render("user-account", { blogpostPost: blogpostPosts});

});

// --------------- About ---------------
app.get("/about", (req, res) => {

    res.render("about", { 
        aboutContent: aboutContent,
         blogpostPost: blogpostPosts
        });

});

// --------------- Contact ---------------
app.get("/contact", (req, res) => {

    res.render("contact", { 
        contactContent: contactContent, 
        blogpostPost: blogpostPosts
    });

});


app.listen(port, () => {
    console.log(`Ablaze's server started on port http://localhost:${port}`);
});
