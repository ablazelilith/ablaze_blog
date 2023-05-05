const express = require("express");
const ejs = require('ejs');
const path = require('path'); // native node module
const multer  = require('multer');

const port = 3000;
const date = require(__dirname + "/date.js");


// **************** Upload Image ****************
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
// **************** Upload Image ****************


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const homeStartContent = {
    title: "Hi, welcome to Blaze!",
    content: "Your blog is empty at the moment. Share your unique, memorable experience today and immediately get 100 free flare points that you can accumulate and award to your favorite blog authors. Let's get blogging!"
};

const featuredBlogs = [
    {
        id: "BZ01",
        title: "Spaghetti from Lady and the Tramp",
        hero: "spaghetti-from-lady-and-the-tramp-hero.png",
        thumbnail: "spaghetti-from-lady-and-the-tramp.jpeg",
        intro: "During the summer, they worked hard: they trained to jump from hats to scarves, to hold on to ringlets, to swing from barrettes to elastic bands. They sow discord in very quiet classes, they terrorize teachers with long hair.",
        content: "What are we eating tonight ?  The most famous spaghetti in the world: those of Lady and the Tramp. It's dumplings, isn't it? Here is the recipe, served with its al dente anecdotes. Ingredients For the dumplings: Exactly, speaking of dumplings: the legendary dinner scene between Lady and Tramp almost never existed! Walt Disney was not convinced by the first sketches. Screenwriter Frank Thomas was a firm believer in this and decided to draw and animate the scene before showing it to Walt Disney. Bingo, it worked! - about 400 gr of meat (depending on your tastes, it can be only beef, a beef / veal mix, in a veggie version with lentils, red beans, cauliflower, tofu etc.) - 25 gr of stale bread (or breadcrumbs) - 1 glass of milk - 15-20 gr of grated parmesan (according to your tastes too, we tend to always add more) - 1 egg - 2 tablespoons of flour - 1 knob of butter - the inseparable duo: salt, pepper Ps: you can also add thyme, bay leaf, parsley... as you like! For the rest: The character of Lady, Beauty, is inspired by Joe Grant's pretty Cocker Spaniel dog, and Clochard is inspired by a real abandoned dog who had found refuge in the Disney studios. It was even the screenwriter of Sleeping Beauty and Cinderella who finally adopted it! - 400 gr of spaghetti - 800 gr of tomato pulp - 1 onion - 1 clove of garlic - olive oil - herbs (if you want)",
        contentImages: [],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/manger/spaghettis-belle-et-le-clochard-disney-recette",
        time: "n/a"
    },
    {
        id: "BZ02",
        title: "Thank you moms — Read & Grow",
        hero: "thank-you-moms-hero.png",
        thumbnail: "thank-you-moms.png",
        intro: "We love you because whatever life tells us, we know that your secret is that you will always be there, right next door. We love you. We love you when you serve us Sunday Burgundy for the third time.",
        content: "We love you. We love you when you serve us Sunday Burgundy for the third time. We love you when you knit us bedtime stories and sweaters that are not always symmetrical. We love you when you send messages on whatsapp, postcards, kisses on the phone. We love you when you talk to us about Denise, the neighbor, as if we've known her forever. We love you when you slip little surprises under the pillow on the first day of summer vacation. We love you when it smells like hot cake, garden flowers and a little too much jasmine. We love you when you take our old toys out of the attic. We love you when you warm us up with a good herbal tea, vegetable soup or memories of \"back in time \". We love you when you come to the rescue, sometimes off the mark, always in our hearts. We love you when you let go of expressions like \" it's falling like in Gravelotte \" when it rains a lot. We love you when you're on the doorstep when we arrive. We love you when you remember our favorite dishes exactly, and we love you when you remember a little less. We love you because whatever life tells us, we know that your secret is that you will always be there, right next door. ",
        contentImages: [],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/fete-mamie-grand-mere",
        time: "n/a"
    },
    {
        id: "BZ03",
        title: "What a stupid city!",
        hero: "what-a-stupid-city-hero.png",
        thumbnail: "what-a-stupid-city.jpeg",
        intro: "Saturday, from 10 a.m. to 6 p.m., 30 sheep and 10 lambs take advantage of one of the largest parks in Paname. Before going to graze in the large meadows of Île-de-France, all these little people come to meet Parisian families.",
        content: "- Eh bêêêêêh, there are people here! - She is bêêêêêlle the Eiffel Tower. - Sorry, I'm going to be late, there are sheep on the ring road.* That's what you're likely to hear this weekend near La Villette: 40 transhumance sheep are taking a break in the park. Come quickly and meet these adorable sweet bêêêêtes. Saturday, from 10 a.m. to 6 p.m., 30 sheep and 10 lambs take advantage of one of the largest parks in Paname. Before going to graze in the large meadows of Île-de-France, all these little people come to meet Parisian families. On the program: discovery of transhumance, shearing of animals that need it, learning to spin and dye wool, stories for children and above all, a workshop for making pompoms which will be given to the sheep for the start of the transhumance in 4 p.m. Everything is free, outdoors and with a smile. Isn't life bêêêêlle? Transhumance at La Villette,  Prairie du Cercle Sud, March 25, 2023 from 10 a.m. to 6 p.m. * it's a joke, don't worry, the sheep are under the watchful and benevolent eye of Vernopâture, they won't be on the perih' but in the Parc de la Villette! ",
        contentImages: [""],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittlekids.fr/sortir/mouton-paris-villette-transhumance-activites-enfants-decouverte",
        time: "n/a"
    },
    {
        id: "BZ04",
        title: "The battle of the schools",
        hero: "the-battle-of-the-schools-hero.png",
        thumbnail: "the-battle-of-the-schools.png",
        intro: "We have put aside their bestsellers for you to learn while having fun: books on great historical figures, super fun encyclopedias, friezes to decorate the courtyard, games to memorize the major events of our history.",
        content: "GET READY TO MAKE A FUSS! Expired. Notice to all parents of students who read us: warm up the class whatsapp and the FCPE email loop! The My Little Kids School Battle is back and this year, we're offering you nearly €200 worth of fun and educational books, games and posters for the whole school. We give you the topo?  For this new edition of our School Battle,  we are partnering with Quelle Histoire, the small publishing house that makes you want to discover History with a capital H.We have put aside their bestsellers for you to learn while having fun: books on great historical figures, super fun encyclopedias, friezes to decorate the courtyard, games to memorize the major events of our history... To pocket the jackpot for your school, it's simple: you create your team in the name of your school and you share it as much as possible. The more you are, the more you climb in the ranking. The first 3 schools win! And so that it's super easy to share, we've planned everything: poster to stick on the panel at the entrance to the school, small sheet to slip into the correspondence book, link to share directly with friends... Prepare you, this Battle, we're going to make a lot of history!",
        contentImages: [],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/battle-ecole-concours-cadeau-livre-jeu-pedagodique-quelle-histoire",
        time: "n/a"
    },
    {
        id: "BZ05",
        title: "Kids friendly clearance sale in Paris",
        hero: "kids-friendly-clearance-sale-in-paris-hero.png",
        thumbnail: "kids-friendly-clearance-sale-in-paris.jpeg",
        intro: "It's not us, it's Céline, the friendly owner of a children's shop on avenue Trudaine in the 9th arrondissement. She's lowering the curtain in a few days to renovate everything and until then, she's selling everything off. Run.",
        content: "We close the shop. It's not us, it's Céline, the friendly owner of a children's shop on avenue Trudaine in the 9th arrondissement. She's lowering the curtain in a few days to renovate everything and until then, she's selling everything off. Run. This pretty shop, Le Monde à l'Anvers, is old enough to be in CE1 (7 years old), and in CE1, you want to redecorate your room, change the layout of the shelves, reverse the bed and the desk. .. That's exactly what Céline wants to do. Freshen up and welcome new brands, even for mums. That, we'll tell you about it another time, for the moment, she's selling off everything from -30 to 50%. The Bobo Choses and Emile et Ida collections to die for, sunglasses made in France, Rose in April shelves, Vilac wooden games, Little Dutch toys, Jellycat comforters, ultra kiki accessories from Minikane (spoiler: there are doll tights)... They're all there! Céline is gradually emptying her Ali Baba cave and is even going to get rid of the wooden furniture (those where there's has the tiger jewelry and the cute little dog patches). Hurry, because clearly, there won't be enough for everyone. Braderie Le Monde à l'Anvers, 10 avenue Trudaine, Paris 9. Open Tuesday to Sunday, 10:30 a.m. to 7:30 p.m. and Sunday, 11 a.m. to 6 p.m. ",
        contentImages: [""],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittlekids.fr/s-habiller-decorer/braderie-le-monde-a-l-envers-paris-trudaine",
        time: "n/a"
    },
    {
        id: "BZ06",
        title: "4 natural lice remedies — For the parents",
        hero: "4-natural-lice-remedies-hero.png",
        thumbnail: "4-natural-lice-remedies.jpeg",
        intro: "What are we eating tonight?  The most famous spaghetti in the world: those of Lady and the Tramp. It's dumplings, isn't it? Here is the recipe, served with its al dente anecdotes.",
        content: "During the summer, they worked hard: they trained to jump from hats to scarves, to hold on to ringlets, to swing from barrettes to elastic bands. They sow discord in very quiet classes, they terrorize teachers with long hair, and above all they are... back. Unfortunately, lice have also made their comeback. The My Little Kids team comes out on the counter-attack! We knocked on the door of our friends at Boldie, the media that talks about beauty and care without fuss and without blabla, and we asked them to give us their 4 best effective AND natural remedies against lice. Results ? E-lice-stuffing! Warning: if you suddenly feel like scratching your hair while reading this newsletter, sorry, but we can't help it, we're itchy too. 1. Coconut oil or olive oil These two oils work wonders on infected heads: apply the oil to the hair, like a hair mask. The ideal is to spend the night with it (just to make sure that the lice die in excruciating pain), covering it with a hat / towel, or even a plastic film so that it soaks in really well. If it's too complicated, try to make it fit at least several episodes of Paw Patrol. Then you comb the hair with an anti-lice comb, then you wash it (with lavender shampoo it is the best). 2. Mayo Strange, and yet... in addition to marvelously enhancing fries, mayo also stifles lice and nits (it's so greasy, ahem). The advantage is that it acts faster than oil, 2 or 3 hours is enough. Then, rebelotte, we comb, we wash. Be careful not to use it on children allergic to eggs. 3. Baking soda Attack lice by sprinkling them with baking soda! Once the scalp of your minus (at least 1 year old) is covered with it, massage for a little while. Then, soak the anti-lice comb in water mixed with baking soda and pass it through all the hair. Finally, we wash the hair, and always the same, with a lavender shampoo it's only better. 4. The This is the trick to prevent instead of cure. In the morning before going to school, place a few drops of lavender essential oil on the back of your child's neck and behind their ears. Lice hate that smell and won't settle on his scalp. Ps: we know that there are plenty of other natural remedies, so don't hesitate to share your tested and verified tips with us (at bonsplans@mylittlekids.com ), we will complete our article as we go. .",
        contentImages: [],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/le-coin-des-parents/remedes-naturels-contre-les-poux-lavande-coco",
        time: "n/a"
    },
    {
        id: "BZ07",
        title: "The egg hunt is chocolate \"Easter\"",
        hero: "the-egg-hunt-is-chocolate-easter-hero.png",
        thumbnail: "the-egg-hunt-is-chocolate-easter.jpeg",
        intro: "Between the bells and the Easter bunny, it's a bit like between pain au chocolat and chocolatine: an endless battle.",
        content: "Between the bells and the Easter bunny, it's a bit like between pain au chocolat and chocolatine: an endless battle. But you know us, at My Little Kids we like to get everyone to agree. So we have selected some ideas for a guaranteed 0% cocoa egg hunt. No chocolate, no debate. Discover our 18 ideas for small Easter gifts to hide in the garden or in the house. Eggs, rabbits, chickens and others, which for once won't risk melting in the sun, nor being devoured by the neighbors' dog or abandoned until next Easter. To your hiding places! 18 Easter gift ideas without chocolate to hide. ",
        contentImages: [""],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittlekids.fr/s-amuser/chasse-paques-idees-changer-chocolat-oeufs",
        time: "n/a"
    },
    {
        id: "BZ08",
        title: "How to explain the strike to children?",
        hero: "how-to-explain-the-strike-to-children-hero.png",
        thumbnail: "how-to-explain-the-strike-to-children.jpeg",
        intro: "At the moment, it's a little discord in the heads of the little ones. Children have lots of questions, and we don't always have the answers. So we rummaged to find educational and simple resources.",
        content: "Why isn't the mistress there? Why are there parades in the streets? Why are we only talking about 49.3? At the moment, it's a little discord in the heads of the little ones. Children have lots of questions, and we don't always have the answers. So we rummaged to find educational and simple resources. History that children see more clearly, and us too. We cut it into 3 parts, it's up to you!  The strike, what is it? What is the strike ? It's a very well explained short video from 1jour1actu, the kingpins of fun and educational info. Besides, they also explain to you what it is for demonstrating! Finally, when classmates have the idea of ​​publishing their own newspaper, it gives a point of view on the news by children for children and it's brilliant! There they explain what the right to strike is . Congratulations little citizens! The 49.what? Because a little update from 1jour1actu on this famous article, even when you're big, it doesn't hurt at all. Lumni, the school support platform of France Télévisions also analyzes the subject.  We continue with Le quarter d’heure actu, the podcast on Bayard Jeunesse news for children, and in the edition of March 17, we talk about pension reform and 49.3.  And then for a little fun, there isthis very funny comparison of Jarry which made us laugh. Finally, while searching, we came across the Broccoli Theory , which is yet another way of explaining 49.3. The point of view of the article is not neutral you will see, but the metaphor is well found! But by the way, what exactly is retirement? As usual, 1jour1actu hits the mark with a super clear and fun explanation ! This way, you will find a simple and educational approach to the Dauphiné to address the challenges of the reform , and on the side of the world of teenagers too. The expressions hidden in Kanako's beautiful illustration: between dog and wolf, sissy, giving the cat its tongue, a 5-legged sheep, going from rooster to donkey.",
        contentImages: [""],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittlekids.fr/le-coin-des-parents/greve-enfant-expliquer-ressources-contenus-parents-manifestation",
        time: "n/a"
    },
    {
        id: "BZ09",
        title: "The little roadside restaurant",
        thumbnail: "the-little-roadside-restaurant.jpeg",
        intro: "One day, Valentine and Thomas came with friends to Café Brochier. They said to themselves \"this place is great\". Their friends told them it was for sale.",
        content: "One day, Valentine and Thomas came with friends to Café Brochier. They said to themselves \"this place is great\". Their friends told them it was for sale. Neither one nor two, they launched and took over the historic café of Saint Julien. It is said that that day, in this small village clinging to the route du vertigo, we heard the \"phew\" of the 230 inhabitants throughout the Vercors massif. It may sound cliché, little young people who settle in a village. Except that a cliché, it works and on this side, Valentine and Thomas have assured. When he's not in the kitchen and she's not wandering between the tables, they both go out to meet local artisans: there's blue cheese from Vercors-Sassenage, fleshy trout from Echevis, very fresh little mousses from the Col de la Machine brewery... The dishes change with the seasons and encounters. Upstairs, 3 small bedrooms await hikers. Because for 10€, Valentine and Thomas will prepare a picnic basket for you to take away up there in the summits. Mark the path well, you will have to be back for the sunset. It can be savored from the perched garden of Café Brochier. Café Brochier , 4 Place de la Fontaine 26420 Saint-Julien-en-Vercors. More info on 04 75 48 20 84 or contact@cafebrochier.com Wait! We didn't even have time to introduce you to Merlot!",
        contentImages: ["the-little-roadside-restaurant-1.jpeg"],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittleparis.com/my-little-travel/cafe-brochier-vercors",
        time: "April 13, 2023"
    },
    {
        id: "BZ10",
        title: "The little thrift store in Paris — Dress & Decorate",
        hero: "the-little-thrift-store-in-paris-hero.png",
        thumbnail: "the-little-thrift-store-in-paris.jpeg",
        intro: "When the pants go to straws and the t-shirts are really too short, you have to act, and quickly. The first thing to do is not to panic. The second is to go quickly to Mini Nippes. It's the little thrift store that comes to your rescue.",
        content: "When the pants go to straws and the t-shirts are really too short, you have to act, and quickly. The first thing to do is not to panic. The second is to go quickly to Mini Nippes. It's the little thrift store that comes to your rescue. In a small street in the 9th arrondissement, nestled between a neighborhood bakery and a Thai restaurant full of promise, is Mini Nippes, the coolest little thrift store for kids in Paris. The shop is not big and that's good: Marie carefully chooses and stores all these nuggets. Petit Bateau, Bout'chou, Zara, Cyrillus... Classic but also smaller brands like Louise Misha or Bobo Choses. On the price side, everything is fine. We let loose on a Petit Bateau jumper at €12, bodysuits at €5, a Louise Misha blouse at €14. Sorry we took the last pair of jellyfish in 22. But don't worry, Marie has restocking every day, she is known to all the mothers in the neighborhood who come to drop off whole bags of small clothes for her. Besides, you don't have any sorting to do do you? Mini Nippes , 4 rue Louise Emilie de la Tour d'Auvergne, 9th arrondissement. Consignment-sale of clothes, childcare, toys and some new end of series Opening hours: Tuesday to Saturday from 10:30 a.m. to 1:30 p.m. and from 2:30 p.m. to 7 p.m. Info on 01 48 78 26 94",
        contentImages: [""],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittlekids.fr/s-habiller-decorer/boutique-enfant-seconde-main-paris-09-depot-vente",
        time: "n/a"
    },
{
        id: "BZ11",
        title: "Paris goes adrift",
        hero: "",
        thumbnail: "paris-goes-adrift.gif",
        intro: "Do you know the best kept secret of Parisians? Get closer and read this: stay in Paris in August, because it's the best month of the year . With its head in the sun and its feet in the Seine, emptied of its usual hubbub, Paris finds its good humor again and finally enjoys happy days.",
        content: "Do you know the best kept secret of Parisians? Get closer and read this: stay in Paris in August, because it's the best month of the year . With its head in the sun and its feet in the Seine, emptied of its usual hubbub, Paris finds its good humor again and finally enjoys happy days. So for this last summer newsletter before the start of the school year, we invite you to rediscover it by leaving ... in a spin. In peanut. Finally adrift. The  Drift, is the name of the app created by a team of happy urban adventurers who made us want to put our most poetic summer addresses there. Download it, get out of your house, and like an explorer, follow the compass that guides you to 20 summer treasures: a hammock by the water, the oldest tree in Paris, a sublime impasse, fridges not frosted, an unsuspected rooftop... Good drift, beautiful summer, we can't wait to see you again. Download  Drift , a Heretical Project. Select a drift you want to do on our map. Lace up your shoes and head out to enjoy the Parisian paths you haven't taken yet.",
        contentImages: [""],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "https://www.mylittleparis.com/balades/appli-derive",
        time: "n/a"
    },
    {
        id: "BZ12",
        title: "Hand-roll bar tokyoïte",
        hero: "",
        thumbnail: "hand-roll-bar-tokyoite.jpeg",
        intro: "But what is missing in this place? Didn't notice anything? Yes, here it is: seats. Kaïto is a pocket restaurant inspired by Tokyo bars, where hungry bellies parade upright to enjoy high-flying \"hand-rolls\".",
        content: "",
        contentImages: ["hand-roll-bar-tokyoite-1.gif","hand-roll-bar-tokyoite-2.jpeg"],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
        source: "",
        time: ""
    },
    // {
    //     id: "BZ",
    //     title: "",
    //     hero: "",
    //     thumbnail: "",
    //     intro: "",
    //     content: "",
    //     contentImages: [""],
    //     author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/my-little-travel/" },
    //     source: "",
    //     time: ""
    // },
]

const aboutContent = "Ablaze Blog is an online digital blogging platform where you can share your unique, memorable experience with your family, friends, and other people across the world.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const popularAuthors = [
    { name: "Balancer", points: 100000, image: "thebalancer.png" },
    { name: "Rem", points: 89000, image: "rem.png" },
    { name: "Emilia", points: 78000, image: "emilia.png" },
    { name: "Zolrath", points: 10000, image: "zolrath.png" },
    { name: "Yennefer", points: 9600, image: "yennefer.png" },
    { name: "Geralt", points: 8500, image: "geralt.png" },
    { name: "Alna", points: 7600, image: "alna.png" },
    { name: "Veithael", points: 5000, image: "veithael.png" },
    { name: "Albedo", points: 4800, image: "albedo.png" },
    { name: "Ainz", points: 4400, image: "ainz.png" },
    { name: "Mehira", points: 4100, image: "mehira.png" },
    { name: "Audrae", points: 3900, image: "audrae.png" },
    { name: "Talene", points: 1500, image: "aw_talene.png" },
    { name: "Baden", points: 1200, image: "aw_baden.png" },
    { name: "Olgath", points: 800, image: "olgath.png" },
    { name: "Thane", points: 980, image: "aw_thane.png" },
    { name: "Lucretia", points: 1000, image: "lucretia.png" },
    { name: "Solise", points: 700, image: "solise.png" },
    { name: "Elijah & Lailah", points: 500, image: "elijah-lailah.png" },
    { name: "Belinda", points: 500, image: "aw_belinda.png" },
    { name: "Pippa", points: 500, image: "halloween-pippa.png" },
];

let blogName = "My Blog";
const blogpostTitles = [];
const blogpostPosts = [];
const blogpostAuthors = [];
const authorContactLinks = [];
const blogpostDates = [];
const blogpostIDs = [];
const postImages = [];

app.get("/", (req, res) => {
    // res.send("Ablaze");
    const todayDate = date.getDate();

    res.render("blogs", { 
        homeContent: homeStartContent, 
        featuredBlog: featuredBlogs, 
        blogpostPost: blogpostPosts, 
        blogpostTitle: blogpostTitles, 
        blogpostAuthor: blogpostAuthors, 
        authorContactLink: authorContactLinks,
        blogpostDate: blogpostDates,
        author: popularAuthors, 
    });
});

app.post("/", (req, res) => {
});

app.get("/featured-blogs", (req, res) => {
    const todayDate = date.getDate();
    res.render("featured-blogs", { 
        homeContent: homeStartContent, 
        featuredBlog: featuredBlogs, 
        blogpostPost: blogpostPosts, 
        blogpostTitle: blogpostTitles, 
        blogpostAuthor: blogpostAuthors, 
        blogpostDate: blogpostDates 
    });
});

app.get("/authors", (req, res) => {
    res.render("authors", {
        author: popularAuthors, 
        blogpostPost: blogpostPosts
    });
});

app.get("/popular-authors", (req, res) => {
    res.render("popular-authors", {
        author: popularAuthors, 
        blogpostPost: blogpostPosts
    });
});

app.get("/about", (req, res) => {
    res.render("about", { 
        aboutContent: aboutContent,
         blogpostPost: blogpostPosts
        });
});

app.get("/contact", (req, res) => {
    res.render("contact", { 
        contactContent: contactContent, 
        blogpostPost: blogpostPosts
    });
});

app.get("/my-blog", (req, res) => {
    res.render("my-blog", { 
        blogName: blogName, 
        homeContent: homeStartContent, 
        featuredBlog: featuredBlogs, 
        blogpostPost: blogpostPosts, 
        blogpostTitle: blogpostTitles, 
        blogpostAuthor: blogpostAuthors, 
        authorContactLink: authorContactLinks,
        blogpostDate: blogpostDates,
        blogpostID: blogpostIDs,
        postImage: postImages
    });
});


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

app.get("/my-account", (req, res) => {
    res.render("my-account", { blogpostPost: blogpostPosts});
});


app.listen(port, () => {
    console.log(`Ablaze's server started on port http://localhost:${port}`);
});
