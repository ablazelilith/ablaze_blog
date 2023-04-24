const express = require("express");
const ejs = require('ejs');
const date = require(__dirname + "/date.js");
const localPort = 4000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const homeStartContent = {
    title: "Welcome to Ablaze Blog!",
    content: "Your blog is empty at the moment. Share your unique, memorable experience today and immediately get 100 free flare points that you can accumulate and award to your favorite blog authors. Let's get blogging!"
};

let newBlogName = "";

const popularBlogPosts = [
    {
        title: "Read & Grow | Get Ready To Make A Fuss!",
        thumbnail: "images/blogs/blog_0.png",
        intro: "Notice to all parents of students who read us: warm up the class whatsapp and the FCPE email loop! The My Little Kids School Battle is back and this year, we're offering you nearly €200 worth of fun and educational books, games and posters for the whole school. We give you the topo?",
        content: "For this new edition of our School Battle,  we are partnering with Quelle Histoire, the small publishing house that makes you want to discover History with a capital H.We have put aside their best-sellers for you to learn while having fun: books on the great historical figures, super playful encyclopedias, friezes to decorate the courtyard, games to memorize the great events of our History... To pocket the jackpot for your school, it's simple: you create your team in the name of your school and you share it as much as possible. The more you are, the more you climb in the ranking. The first 3 schools win! And so that it's super easy to share, we've planned everything: poster to stick on the panel at the entrance to the school, small sheet to slip into the correspondence book, link to share directly with friends... Prepare you, this Battle, we're going to make a lot of history! Participate in the My Little Kids x Quelle Histoire School Battle to pocket a whole fun and educational pack for your whole school. Create your team (make sure it doesn't already exist in the drop-down menu), and share share! We have provided you with a whole kit to make it as easy as possible: poster to put on the notice board in front of the school, sheet to slip into the correspondence book or to distribute when leaving school, link to share directly... We're counting on you!",
        contentImages: [],
        author: { name: "My Little Kids", externalLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/battle-ecole-concours-cadeau-livre-jeu-pedagodique-quelle-histoire",
        time: "N/A"
    },
    {
        title: "S'Amuser | Bouboule, Poil De Carotte, Binoclad Et Cie",
        thumbnail: "images/blogs/s-amusers.jpeg",
        intro: "The truth comes out of children's mouths, okay. But not always. Remember the hard law of the playgrounds and the mockery that burst through the ranks: bouboule, wire, calculator, dwarf, rouquemoute, breadboard, asparagus ...",
        content: "To put an end to the taunts about the physical, we found the drawing workshop that does not erase the differences. Better: he colors them. It's happening Saturday, April 15, from 3 p.m. to 5 p.m. at the Chez Mona café, a few steps from Odéon. Nestled in a former primary school, this place supports all women and their projects. And this time it's Barbocitron, the illustrator who gives freedom to the pencils, who settles in the café. Barbara leads children from the age of 4 to reflect on stereotypes, where they come from, how they arrive in the playgrounds, and how to manage to get out of them. While your children wake up with colors, you quietly squat the café and the well-stocked library. Shall we meet on the big couch near the window? Drawing workshop to knock out clichés with Barbocitron, the illustrator who gives freedom to pencils, at Chez Mona café, 9 rue de Vaugirard, 75006 Paris. From 4 years old. Reservation required here.   Saturday April 15 from 3 p.m. to 5 p.m. Recommended price: €15, this price allows the team to pay Barbara correctly and keep the café alive. Mona's team has also set up a solidarity rate of €5, so that everyone can have access to the workshop, even families in precarious situations.",
        contentImages: [],
        author: { name: "My Little Kids", externalLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/sortir/chasse-oeufs-big-mamma-felicita-concours",
        time: "N/A"
    },
    {
        title: "To Go Out | The Coolest Egg Hunt",
        thumbnail: "images/blogs/journal2.jpeg",
        intro: "We're playing carrots on the table: this Felicità-style egg hunt has been booked for a long time. But at My Little Kids, we are well seen by the  coniglietto di Pasqua (the Easter bunny), he did us a favor: he saved you side seats ...",
        content: "The very last ones, after that it's finished! Earn your pass and meet there at 10:40 a.m. max, doors open at 11 a.m. sharp. The 4500m2 and the thousands of hidden eggs are yours. Roll up your sleeves because the team has prepared a whole slew of challenges for you to take on to win the... Big Rabbit's final jackpot. What it is ? We keep the mystery, but we know that it sends the sacred heavy. As a bonus, at noon, the kitchens open and the giant pizzas are yours to recover from your emotions. Don't delay: the contest starts now, we draw tomorrow and the hunt takes place on Monday! Win the last places for the Felicità egg hunt,  Monday April 10 at 11 a.m. La Felicità, 5 forecourt Alan Turing, 75013 Paris. To drool over the pizzas it's there and to find out more about the egg hunt, it's on this side (but it's full, don't forget)",
        contentImages: ["journal2_1.gif", "journal2_2.png"],
        author: { name: "My Little Kids", externalLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/sortir/chasse-oeufs-big-mamma-felicita-concours",
        time: "N/A"
    }
]


"Your journal is currently empty. Start sharing your daily experience today!";
const aboutContent = "Ablaze Journal is an online digital journal platform where you can share your unique, memorable experience with other people across the world.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const authorName = ["Patrick Shields", "Kyle Friedman", "Marvin Mcmahon", "Elena Schultz", "Hector Meyers", "Harold Alvarez", "Gabriel Barrett", "Joshua Wilkerson", "Michael Knowles", "Ronald Norman", "Christopher Williams", "Brian Conway"];
const blogpostTitles = [];
const blogpostPosts = [];
const blogpostAuthors = [];
const blogpostDates = [];

app.get("/", (req, res) => {
    // res.send("Ablaze");
    const todayDate = date.getDate();

    res.render("blogs", { newBlogName: newBlogName, homeContent: homeStartContent, popularBlogPost: popularBlogPosts, blogpostPost: blogpostPosts, blogpostTitle: blogpostTitles, blogpostAuthor: blogpostAuthors, blogpostDate: blogpostDates });
});

app.post("/", (req, res) => {
});

app.get("/worlds-blogs", (req, res) => {
    const todayDate = date.getDate();
    res.render("worlds-blogs", { newBlogName: newBlogName, homeContent: homeStartContent, popularBlogPost: popularBlogPosts, blogpostPost: blogpostPosts, blogpostTitle: blogpostTitles, blogpostAuthor: blogpostAuthors, blogpostDate: blogpostDates });
});

app.get("/authors", (req, res) => {
    res.render("authors", {authorName: authorName, blogpostPost: blogpostPosts});
});

app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutContent, blogpostPost: blogpostPosts});
});

app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contactContent, blogpostPost: blogpostPosts});
});

app.get("/my-blog", (req, res) => {
    res.render("my-blog", { newBlogName: newBlogName, homeContent: homeStartContent, popularBlogPost: popularBlogPosts, blogpostPost: blogpostPosts, blogpostTitle: blogpostTitles, blogpostAuthor: blogpostAuthors, blogpostDate: blogpostDates });
});


app.get("/new-blog", (req, res) => {
    res.render("new-blog", { newBlogName: newBlogName, blogpostPost: blogpostPosts});
});

app.post("/new-blog", (req, res) => {
    newBlogName = req.body.blogName;
    let newBlogpostTitle = req.body.blogpostTitle.toLowerCase();
    let newBlogpost = req.body.blogpostText;
    let newBlogpostAuthor = req.body.blogpostAuthor;
    let newBlogpostDate = date.getDate();


    // console.log(newBlogpost);

    blogpostTitles.push(newBlogpostTitle);
    blogpostPosts.push(newBlogpost);
    blogpostAuthors.push(newBlogpostAuthor);
    blogpostDates.push(newBlogpostDate);

    res.redirect("/my-blog");
});

app.get("/account", (req, res) => {
    res.render("account", { blogpostPost: blogpostPosts});
});

app.listen(localPort, () => {
    console.log("Ablaze server started on port http://localhost:" + localPort);
});
