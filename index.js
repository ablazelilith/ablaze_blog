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
        title: "The battle of the schools",
        hero: "the-battle-of-the-schools-hero.png",
        thumbnail: "the-battle-of-the-schools.png",
        intro: "We have put aside their bestsellers for you to learn while having fun: books on great historical figures, super fun encyclopedias, friezes to decorate the courtyard, games to memorize the major events of our history.",
        content: "GET READY TO MAKE A FUSS! Expired. Notice to all parents of students who read us: warm up the class whatsapp and the FCPE email loop! The My Little Kids School Battle is back and this year, we're offering you nearly €200 worth of fun and educational books, games and posters for the whole school. We give you the topo?  For this new edition of our School Battle,  we are partnering with Quelle Histoire, the small publishing house that makes you want to discover History with a capital H.We have put aside their bestsellers for you to learn while having fun: books on great historical figures, super fun encyclopedias, friezes to decorate the courtyard, games to memorize the major events of our history... To pocket the jackpot for your school, it's simple: you create your team in the name of your school and you share it as much as possible. The more you are, the more you climb in the ranking. The first 3 schools win! And so that it's super easy to share, we've planned everything: poster to stick on the panel at the entrance to the school, small sheet to slip into the correspondence book, link to share directly with friends... Prepare you, this Battle, we're going to make a lot of history!",
        contentImages: [],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/battle-ecole-concours-cadeau-livre-jeu-pedagodique-quelle-histoire",
        time: "N/A"
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
        time: "N/A"
    },
    {
        id: "BZ03",
        title: "Spaghetti from Lady & the Tramp",
        hero: "spaghetti-from-lady-and-the-tramp-hero.png",
        thumbnail: "spaghetti-from-lady-and-the-tramp.jpeg",
        intro: "During the summer, they worked hard: they trained to jump from hats to scarves, to hold on to ringlets, to swing from barrettes to elastic bands. They sow discord in very quiet classes, they terrorize teachers with long hair.",
        content: "What are we eating tonight ?  The most famous spaghetti in the world: those of Lady and the Tramp. It's dumplings, isn't it? Here is the recipe, served with its al dente anecdotes. Ingredients For the dumplings: Exactly, speaking of dumplings: the legendary dinner scene between Lady and Tramp almost never existed! Walt Disney was not convinced by the first sketches. Screenwriter Frank Thomas was a firm believer in this and decided to draw and animate the scene before showing it to Walt Disney. Bingo, it worked! - about 400 gr of meat (depending on your tastes, it can be only beef, a beef / veal mix, in a veggie version with lentils, red beans, cauliflower, tofu etc.) - 25 gr of stale bread (or breadcrumbs) - 1 glass of milk - 15-20 gr of grated parmesan (according to your tastes too, we tend to always add more) - 1 egg - 2 tablespoons of flour - 1 knob of butter - the inseparable duo: salt, pepper Ps: you can also add thyme, bay leaf, parsley... as you like! For the rest: The character of Lady, Beauty, is inspired by Joe Grant's pretty Cocker Spaniel dog, and Clochard is inspired by a real abandoned dog who had found refuge in the Disney studios. It was even the screenwriter of Sleeping Beauty and Cinderella who finally adopted it! - 400 gr of spaghetti - 800 gr of tomato pulp - 1 onion - 1 clove of garlic - olive oil - herbs (if you want)",
        contentImages: [],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/manger/spaghettis-belle-et-le-clochard-disney-recette",
        time: "N/A"
    },
    {
        id: "BZ04",
        title: "What a stupid city!",
        hero: "what-a-stupid-city-hero.png",
        thumbnail: "what-a-stupid-city.jpeg",
        intro: "Saturday, from 10 a.m. to 6 p.m., 30 sheep and 10 lambs take advantage of one of the largest parks in Paname. Before going to graze in the large meadows of Île-de-France, all these little people come to meet Parisian families.",
        content: "- Eh bêêêêêh, there are people here! - She is bêêêêêlle the Eiffel Tower. - Sorry, I'm going to be late, there are sheep on the ring road.* That's what you're likely to hear this weekend near La Villette: 40 transhumance sheep are taking a break in the park. Come quickly and meet these adorable sweet bêêêêtes. Saturday, from 10 a.m. to 6 p.m., 30 sheep and 10 lambs take advantage of one of the largest parks in Paname. Before going to graze in the large meadows of Île-de-France, all these little people come to meet Parisian families. On the program: discovery of transhumance, shearing of animals that need it, learning to spin and dye wool, stories for children and above all, a workshop for making pompoms which will be given to the sheep for the start of the transhumance in 4 p.m. Everything is free, outdoors and with a smile. Isn't life bêêêêlle? Transhumance at La Villette,  Prairie du Cercle Sud, March 25, 2023 from 10 a.m. to 6 p.m. * it's a joke, don't worry, the sheep are under the watchful and benevolent eye of Vernopâture, they won't be on the perih' but in the Parc de la Villette! ",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/sortir/mouton-paris-villette-transhumance-activites-enfants-decouverte",
        time: "N/A"
    },
    {
        id: "BZ05",
        title: "What you need to know about Lilibeth",
        hero: "",
        thumbnail: "what-you-need-to-know-about-lilibeth.png",
        intro: "She had the truck license but did not have a passport. She's had over 30 corgis, she's shook hands with the Spice Girls, Churchill, Elton John and even James Bond. Yesterday was the funeral of the most famous grandmother in the world.",
        content: "She had the truck license but did not have a passport. She's had over 30 corgis, she's shook hands with the Spice Girls, Churchill, Elton John and even James Bond. Yesterday was the funeral of the most famous grandmother in the world. And because we don't always have the answer to \"why the English have a queen and not a president?\", \"is the crown heavy?\", we have unearthed some sources of... royal information.",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/livres-enfants-reine-d-angleterre-elisabeth-ii",
        time: "N/A"
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
        time: "N/A"
    },
    {
        id: "BZ07",
        title: "Kids friendly clearance sale in Paris",
        hero: "kids-friendly-clearance-sale-in-paris-hero.png",
        thumbnail: "kids-friendly-clearance-sale-in-paris.jpeg",
        intro: "It's not us, it's Céline, the friendly owner of a children's shop on avenue Trudaine in the 9th arrondissement. She's lowering the curtain in a few days to renovate everything and until then, she's selling everything off. Run.",
        content: "We close the shop. It's not us, it's Céline, the friendly owner of a children's shop on avenue Trudaine in the 9th arrondissement. She's lowering the curtain in a few days to renovate everything and until then, she's selling everything off. Run. This pretty shop, Le Monde à l'Anvers, is old enough to be in CE1 (7 years old), and in CE1, you want to redecorate your room, change the layout of the shelves, reverse the bed and the desk. .. That's exactly what Céline wants to do. Freshen up and welcome new brands, even for mums. That, we'll tell you about it another time, for the moment, she's selling off everything from -30 to 50%. The Bobo Choses and Emile et Ida collections to die for, sunglasses made in France, Rose in April shelves, Vilac wooden games, Little Dutch toys, Jellycat comforters, ultra kiki accessories from Minikane (spoiler: there are doll tights)... They're all there! Céline is gradually emptying her Ali Baba cave and is even going to get rid of the wooden furniture (those where there's has the tiger jewelry and the cute little dog patches). Hurry, because clearly, there won't be enough for everyone. Braderie Le Monde à l'Anvers, 10 avenue Trudaine, Paris 9. Open Tuesday to Sunday, 10:30 a.m. to 7:30 p.m. and Sunday, 11 a.m. to 6 p.m. ",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/s-habiller-decorer/braderie-le-monde-a-l-envers-paris-trudaine",
        time: "N/A"
    },
    {
        id: "BZ08",
        title: "The egg hunt is chocolate \"Easter\"",
        hero: "the-egg-hunt-is-chocolate-easter-hero.png",
        thumbnail: "the-egg-hunt-is-chocolate-easter.jpeg",
        intro: "Between the bells and the Easter bunny, it's a bit like between pain au chocolat and chocolatine: an endless battle.",
        content: "Between the bells and the Easter bunny, it's a bit like between pain au chocolat and chocolatine: an endless battle. But you know us, at My Little Kids we like to get everyone to agree. So we have selected some ideas for a guaranteed 0% cocoa egg hunt. No chocolate, no debate. Discover our 18 ideas for small Easter gifts to hide in the garden or in the house. Eggs, rabbits, chickens and others, which for once won't risk melting in the sun, nor being devoured by the neighbors' dog or abandoned until next Easter. To your hiding places! 18 Easter gift ideas without chocolate to hide. ",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/s-amuser/chasse-paques-idees-changer-chocolat-oeufs",
        time: "N/A"
    },
    {
        id: "BZ08",
        title: "How to explain the strike to children?",
        hero: "how-to-explain-the-strike-to-children-hero.png",
        thumbnail: "how-to-explain-the-strike-to-children.jpeg",
        intro: "At the moment, it's a little discord in the heads of the little ones. Children have lots of questions, and we don't always have the answers. So we rummaged to find educational and simple resources.",
        content: "Why isn't the mistress there? Why are there parades in the streets? Why are we only talking about 49.3? At the moment, it's a little discord in the heads of the little ones. Children have lots of questions, and we don't always have the answers. So we rummaged to find educational and simple resources. History that children see more clearly, and us too. We cut it into 3 parts, it's up to you!  The strike, what is it? What is the strike ? It's a very well explained short video from 1jour1actu, the kingpins of fun and educational info. Besides, they also explain to you what it is for demonstrating! Finally, when classmates have the idea of ​​publishing their own newspaper, it gives a point of view on the news by children for children and it's brilliant! There they explain what the right to strike is . Congratulations little citizens! The 49.what? Because a little update from 1jour1actu on this famous article, even when you're big, it doesn't hurt at all. Lumni, the school support platform of France Télévisions also analyzes the subject.  We continue with Le quarter d’heure actu, the podcast on Bayard Jeunesse news for children, and in the edition of March 17, we talk about pension reform and 49.3.  And then for a little fun, there isthis very funny comparison of Jarry which made us laugh. Finally, while searching, we came across the Broccoli Theory , which is yet another way of explaining 49.3. The point of view of the article is not neutral you will see, but the metaphor is well found! But by the way, what exactly is retirement? As usual, 1jour1actu hits the mark with a super clear and fun explanation ! This way, you will find a simple and educational approach to the Dauphiné to address the challenges of the reform , and on the side of the world of teenagers too. The expressions hidden in Kanako's beautiful illustration: between dog and wolf, sissy, giving the cat its tongue, a 5-legged sheep, going from rooster to donkey.",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/le-coin-des-parents/greve-enfant-expliquer-ressources-contenus-parents-manifestation",
        time: "N/A"
    },
    {
        id: "BZ09",
        title: "The little roadside restaurant",
        thumbnail: "the-little-roadside-restaurant.jpeg",
        intro: "One day, Valentine and Thomas came with friends to Café Brochier. They said to themselves \"this place is great\". Their friends told them it was for sale.",
        content: "One day, Valentine and Thomas came with friends to Café Brochier. They said to themselves \"this place is great\". Their friends told them it was for sale. Neither one nor two, they launched and took over the historic café of Saint Julien. It is said that that day, in this small village clinging to the route du vertigo, we heard the \"phew\" of the 230 inhabitants throughout the Vercors massif. It may sound cliché, little young people who settle in a village. Except that a cliché, it works and on this side, Valentine and Thomas have assured. When he's not in the kitchen and she's not wandering between the tables, they both go out to meet local artisans: there's blue cheese from Vercors-Sassenage, fleshy trout from Echevis, very fresh little mousses from the Col de la Machine brewery... The dishes change with the seasons and encounters. Upstairs, 3 small bedrooms await hikers. Because for 10€, Valentine and Thomas will prepare a picnic basket for you to take away up there in the summits. Mark the path well, you will have to be back for the sunset. It can be savored from the perched garden of Café Brochier. Café Brochier , 4 Place de la Fontaine 26420 Saint-Julien-en-Vercors. More info on 04 75 48 20 84 or contact@cafebrochier.com Wait! We didn't even have time to introduce you to Merlot!",
        contentImages: ["the-little-roadside-restaurant-1.jpeg"],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/"},
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
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/s-habiller-decorer/boutique-enfant-seconde-main-paris-09-depot-vente",
        time: "N/A"
    },
    {
        id: "BZ11",
        title: "Paris goes adrift",
        hero: "",
        thumbnail: "paris-goes-adrift.gif",
        intro: "Do you know the best kept secret of Parisians? Get closer and read this: stay in Paris in August, because it's the best month of the year . With its head in the sun and its feet in the Seine, emptied of its usual hubbub, Paris finds its good humor again and finally enjoys happy days.",
        content: "Do you know the best kept secret of Parisians? Get closer and read this: stay in Paris in August, because it's the best month of the year . With its head in the sun and its feet in the Seine, emptied of its usual hubbub, Paris finds its good humor again and finally enjoys happy days. So for this last summer newsletter before the start of the school year, we invite you to rediscover it by leaving ... in a spin. In peanut. Finally adrift. The  Drift, is the name of the app created by a team of happy urban adventurers who made us want to put our most poetic summer addresses there. Download it, get out of your house, and like an explorer, follow the compass that guides you to 20 summer treasures: a hammock by the water, the oldest tree in Paris, a sublime impasse, fridges not frosted, an unsuspected rooftop... Good drift, beautiful summer, we can't wait to see you again. Download  Drift , a Heretical Project. Select a drift you want to do on our map. Lace up your shoes and head out to enjoy the Parisian paths you haven't taken yet.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/balades/appli-derive",
        time: "N/A"
    },
    {
        id: "BZ12",
        title: "Hand-roll bar tokyoïte",
        hero: "",
        thumbnail: "hand-roll-bar-tokyoite.jpeg",
        intro: "But what is missing in this place? Didn't notice anything? Yes, here it is: seats. Kaïto is a pocket restaurant inspired by Tokyo bars, where hungry bellies parade upright to enjoy high-flying \"hand-rolls\".",
        content: "",
        contentImages: ["hand-roll-bar-tokyoite-1.gif","hand-roll-bar-tokyoite-2.jpeg"],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-manger/kaito-hand-roll-standing-sushi",
        time: "N/A"
    },
    {
        id: "BZ13",
        title: "Bonjour, Paris !",
        hero: "",
        thumbnail: "bonjour-paris.png",
        intro: "A new bistro on the Butte Montmartre, a salt chamber in the 7th, a  rooftop in the 2nd, a Filipino sandwich in the 11th,  an exhibition for crackpots , a Japanese restaurant on the roof...",
        content: "Boom. Boom-boom. Boom-boom-boom. You hear? The pulses quicken. The city regains its allegro tempo. After spending the summer in ukulule mode , Paris resumes its jazz . With 20 new addresses that vibrate , restaurants that swing, evenings that will go into a spin like a drum solo. A new bistro on the Butte Montmartre, a salt chamber in the 7th, a  rooftop in the 2nd, a Filipino sandwich in the 11th,  an exhibition for crackpots , a Japanese restaurant on the roof... Some have not yet open. Others are waiting for you. Last coat of paint. Last hammer blow. And here we go again for the whirlwind of Paris.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/balades/lieux-rentree-2021",
        time: "August 25, 2021"
    },
    {
        id: "BZ14",
        title: "Friends, jazz and pottery",
        hero: "",
        thumbnail: "friends-jazz-and-pottery.jpeg",
        intro: "Here, the discs are slightly scratched. For what ? Because it's Alice who changes them, and her hands are often covered in clay. This is what happens when you turn an old jazz club into a creative workshop. Welcome to Big Band Pottery.",
        content: "Here, the discs are slightly scratched. For what ? Because it's Alice who changes them, and her hands are often covered in clay. This is what happens when you turn an old jazz club into a creative workshop. Welcome to Big Band Pottery. This is the first Kilo Factory of pottery, a new concept, just out of the egg rue Saint-André des Arts: pay according to the weight of its future creation. We stay 1 hour, 2 hours... as long as we want: we don't look at our watch when we want to be an artist. You are free to let yourself go creatively, in this bar with frescoes from the 50s. To the rhythm of Louis Armstrong, you sit down on a piano stool, with a good hot tea and start modeling earthenware. And next time, you can also round up your best friends and privatize the place for a collective workshop.",
        contentImages: ["friends-jazz-and-pottery-1.png", "friends-jazz-and-pottery-2.jpeg"],
        author: { name: "My Little Travel", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/insolite/big-band-poterie",
        time: "January 31, 2023"
    },
    {
        id: "BZ15",
        title: "Flower burst",
        hero: "",
        thumbnail: "flower-burst.jpeg",
        intro: "In a few weeks, it will be the turn of rhododendrons and azaleas to explode into bloom. An impressionist palette to enjoy with your eyes in the garden of the Albert Kahn museum which has just reopened its doors after 6 months of hibernation.",
        content: "Pop. Pop-Pop. Pop Pop Pop. Pop-pop-pop-pop. That was the pear trees. Pop Pop Pop Pop. And that, the apple trees. In a few weeks, it will be the turn of rhododendrons and azaleas to explode into bloom. An impressionist palette to enjoy with your eyes in the garden of the Albert Kahn museum which has just reopened its doors after 6 months of hibernation. First visit the Albert Kahn Museum with its collection of images, objects and videos, then head out into the huge garden towards Japan. Or England. Or the Vosges? Depending on the direction you take, you will find yourself in a Japanese garden and its maples, a Vosges forest and its spruces, a rose garden and its exotic greenhouse, or an English garden and its small stream. A trip around the world in 4 hectares of walks. And if you find space, book for a sensitive visit ,  an intriguing journey that shows the invisible by blindfolding you and inviting you to discover the garden with hearing, touch and your simple imagination. When you open your eyes, a small aesthetic shock. Pop.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com//" },
        source: "https://www.mylittleparis.com/balades/musee-albert-kahn-jardins",
        time: "April 15, 2022"
    },
    {
        id: "BZ16",
        title: "The art of sublimating the broken pots",
        hero: "",
        thumbnail: "the-art-of-sublimating-the-broken-pots.png",
        intro: "Oh nooooo, the cat made a wrong move and accidentally threw this pretty vase offered by Grand-Auntie. Throw it ? No way. Say thank you to your cat, and go see Geneviève : this vase will serve as your therapy.",
        content: "Oh nooooo, the cat made a wrong move and accidentally threw this pretty vase offered by Grand-Auntie. Throw it ? No way. Say thank you to your cat, and go see Geneviève : this vase will serve as your therapy. No, Geneviève is not a shrink, but a ceramic workshop where Kintsugi is practiced, this Japanese art which consists of repairing a broken object by highlighting its cracks with gold, instead of masking them. In small groups, in two-hour sessions in the 11th or 14th, with your own crockery or a piece provided by the workshop, you patiently put the shattered ceramic back together like a puzzle. A meditative and therapeutic practice that embellishes objects, while healing inner wounds: \"Happy are the cracked, because they will let the light pass through\".*  Enough to make you want to be clumsy.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/deco/kintsugi-atelier-genevieve",
        time: "May 20, 2022"
    },
    {
        id: "BZ17",
        title: "The Good Points Of My Little Kids",
        hero: "",
        thumbnail: "the-good-points-of-my-little-kids.jpeg",
        intro: "Bad habits are tough: getting up from the table, skipping the thank you, forgetting to brush your teeth... For a year like clockwork, we asked Kanako to come to our rescue . Result ? New good points to print, so as not to lose good habits.",
        content: "Bad habits are tough: getting up from the table, skipping the thank you, forgetting to brush your teeth... For a year like clockwork, we asked Kanako to come to our rescue . Result ? New good points to print, so as not to lose good habits. We have provided you with all the gear: 15 small images, 3 large images and a cutting box to store the rewards. For us, the deal is 5 images = 1 large. Yes, life is hard. With 3 large images collected, it's the jackpot and that's up to you to find it: yet another cuddly paw patrol, a tchoupi book, an afternoon at the zoo, an orgy of candy, a huge hug. .. Wise as pictures.",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/bons-points-enfants-illustres-dessins",
        time: "N/A"
    },
    {
        id: "BZ18",
        title: "I didn't have the codes to face Paris",
        hero: "Each month, My Little Paris publishes a way of experiencing Paris, shared by a Parisian. For this new column, we give the pen to Victor Habchy, content creator who became known on Social Networks by asking intimate questions to strangers in the streets of Paris.",
        thumbnail: "i-didn't-have-the-codes-to-face-paris.png",
        intro: "Meeting these strangers is very powerful, it makes you more humanistic. It allows you to see that behind their facade, people are beautiful. Vulnerable. That in every person you meet on the street, you can find a story worth listening to. We will never go around humans ... or Parisians!",
        content: "Each month, My Little Paris publishes a way of experiencing Paris, shared by a Parisian. For this new column, we give the pen to Victor Habchy, content creator who became known on Social Networks by asking intimate questions to strangers in the streets of Paris. We talk about him as “the influencer who does things on a bike”, the guy who says  “ How many m2 do you live in? ,  or who asks people what their biggest regret is. It makes him smile. When he posts a video, it comments, it buzzes, and above all it feels good. For this new column, he tells us how social networks have transformed his relationship to himself, and to Paris. “My name is Victor, I'm 30 years old, and I live in Paris. I grew up in Picardy from an Egyptian father and a mother from the South of France. I landed at 18 in Nanterre, to study at university. It wasn't fun… I lived in a 9m2 apartment at the top of a tower and I had trouble acclimatizing. I didn't have a lot of money, so I wandered off to La Défense, to a skate park in the 18th arrondissement, and then I also went to read a book at Fnac. I spent hours standing in the aisles going through photo magazines and reading manga! At that time, Paris was an obligation: I didn't have the shoulders and the codes to face this city that I only knew by its big RER stations: Châtelet, Opéra, Nation…not the real Paris. In fact, I had only one obsession, it was to leave Paris and go travel. I ask them about their greatest regret, the happiest day of their life, the meeting or the event that upset them, the founding phrase or that hurt them the most. Contrary to what people think, I'm really bad at approaching people in the street, I do a little violence, but once the conversation is started, then I know how to listen and create intimacy. I like this moment when we drop the masks and where we enter into the confidence. Me, it makes me feel good to listen to them, them to talk to me, and lots of people find themselves in the stories of others. Meeting these strangers is very powerful, it makes you more humanistic. It allows you to see that behind their facade, people are beautiful. Vulnerable. That in every person you meet on the street, you can find a story worth listening to. We will never go around humans ... or Parisians! »",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/chroniques-parisiennes/victor-habchy-chronique-parisienne",
        time: "February 28, 2023"
    },
    {
        id: "BZ19",
        title: "1 dinner, 6 women",
        hero: "",
        thumbnail: "1-dinner-6-women.jpeg",
        intro: "“Who has ever had their heart broken by a friendship? » . It is with this question that Shelby, a talkative American living in Paris, opens her “table”. Around her, five women she does not know, who have never even met and whom she welcomes in her apartment for a dinner where the futile and the intimate will invite themselves.",
        content: "“Who has ever had their heart broken by a friendship? » . It is with this question that Shelby, a talkative American living in Paris, opens her “table”. Around her, five women she does not know, who have never even met and whom she welcomes in her apartment for a dinner where the futile and the intimate will invite themselves. An evening where we will talk about female friendships in front of roasted broccoli with soy sauce and a dark chocolate pie. It's called & the table  and it takes place in Paris every month. Shelby is one of the hosts sponsored by Samantha Wolfson. It was she who invented these dinners last summer: when life pushed her to leave her native Philadelphia for Amsterdam, she sought to enlarge her circle of friends. And what could be better than a dinner in a very small committee to tell each other differently, to reveal themselves, and to leave with the 06 new friends? Since then, these sorority dinners are popping like kernels of popcorn in Amsterdam, London, Brussels, Rome, Madrid, Barcelona, ​​Lisbon and Paris. Anyone can be invited or become a host. Just register. The next one in Paris will take place on Thursday March 23. Theme and menu may vary. A word of advice: don't wait too long before reserving your place, only five women can participate in each dinner. Intimate, we said. Dinner & the table , from 40 euros: starter, main course, dessert and wine included. Here is the info (in English)   to organize a dinner  and to go to a dinner",
        contentImages: ["1-dinner-6-women-2.jpeg", "1-dinner-6-women-3.jpeg"],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-manger/diner-and-the-table-paris",
        time: "March 03, 2023"
    },
    {
        id: "BZ20",
        title: "Neni - The kitchen of the Israeli mamma",
        hero: "",
        thumbnail: "neni-the-kitchen-of-the-israeli-mamma.png",
        intro: "The one in Berlin sets the city on fire. That of Tel-Aviv is always shielded. Wherever a Neni opens, the savvy forks turn up. It's finally the Parisians' turn to completely forget about Ottolenghi and go crazy for the cuisine of Haya and her four grown-up sons.",
        content: "The one in Berlin sets the city on fire. That of Tel-Aviv is always shielded. Wherever a Neni opens, the savvy forks turn up. It's finally the Parisians' turn to completely forget about Ottolenghi and go crazy for the cuisine of Haya and her four grown-up sons. The chef, a real mamma version of Israel, has just installed her spicy casseroles at the “25hours”. The hotel opened discreetly between Christmas and New Year, there is still no one there. Miracle. More would be too much. And yet, we also loved it all: - the cozy little-sofa-corner to sink your buttocks into - the sweet appetizer labne* and the hummus roll-yourself-in-immediately - the streetfood star Israeli: sabish- the completely kitsch elevator in cracked gold - the rococo lounge in the toilets - the babaganoush to overturn the velvet armchairs - the sapeur atmosphere bar where to end the evening with a DJ set that Berlin would not blush about... better is that we give you the address and you go there. Quickly. It's right in front of the Gare du Nord and after that there won't be any more places the rest of the year.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/mosaiques/les-meilleurs-restaurants-de-paris#chiquitin-le-fief-de-la-street-food-mexicaine",
        time: "N/A"
    },
    {
        id: "BZ21",
        title: "The restaurants where we hear each other talk",
        hero: "the-restaurants-where-we-hear-each-other-talk",
        thumbnail: "the-restaurants-where-we-hear-each-other-talk.jpeg",
        // thumbnail: "the-restaurants-where-we-hear-each-other-talk-1.gif",
        intro: "There are bursts of laughter from the large table next door. The much too intimate conversation of the couple sitting just behind. And then there's the hinged toilet door that squeaks and the clinks  of the dishes being cleared noisily.",
        content: "There are bursts of laughter from the large table next door. The much too intimate conversation of the couple sitting just behind. And then there's the hinged toilet door that squeaks and the clinks  of the dishes being cleared noisily. What a hell of a waste of an outing to the restaurant. It seems that to hear oneself speak, one should not exceed 70 decibels. Here are three addresses that do not exceed 50. Hush, we dine Last summer, a group of four friends created  Osabak , a restaurant with Basque influences, whose specialty is tartare. Their anti-noise secret? Three months after the opening, these “uncles of tartare” have refurbished and soundproofed the entire room for more chill evenings. Osabak, 50 rue Escudier, 92100 Boulogne-Billancourt , tel: 01 40 96 07 80 Here, we sign On the menu of this Moroccan restaurant, each dish is presented with a drawing that shows how to sign it to place an order. Very useful since Sid, the owner, is deaf-mute. Just like the team in the dining room and in the kitchen, of this address with the damn generous couscous. 1000 & 1 signe , 76 rue de Charonne, 75011 Parisv48 decibels Rooted for thirty years in a small cobbled street in Saint-Germain,  L'Heure gourmande  has a dozen tables not too close together, some nestled in small vaulted corners : that explains why here, we don't need to shout \"Huh? What are you saying?\" while frowning. The Gourmet Hour , 22 Passage Dauphine, 75006 Paris tel: 01 46 34 00 40",
        contentImages: ["the-restaurants-where-we-hear-each-other-talk-1.gif"],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-manger/bomaye-burgers-africains-paris",
        time: "February 03, 2023"
    },
    {
        id: "BZ22",
        title: "Saturday is the 45 rpm",
        hero: "",
        thumbnail: "saturday-is-the-45-rpm.png",
        intro: "Calling all diggers at heart: Saturday, rush to La Cuve à Son , in the 12th arrondissement, because at Christophe's, the Disquaire day* is \"every day\".",
        content: "Calling all diggers at heart: Saturday, rush to La Cuve à Son , in the 12th arrondissement, because at Christophe's, the Disquaire day* is \"every day\". The den of this epicurean music lover, recognizable by its cyan blue frontage, ticks all the boxes of the record store: posters on the wall, vinyl records and audio cassettes scattered from floor to ceiling… and a few boutanches in the middle of it all. Trained by a Crillon sommelier, Christophe has a dual role as a record store and wine merchant: this season, he is offering instant beers , brewed in Seine-et-Marne. The perfect spot to kill two birds with one stone: unearth an original cuvée AND turn heads around the record player. What surround his ears and his weekend.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-boire/disquaire-day-cuve-a-son",
        time: "April 22, 2022"
    },
    {
        id: "BZ23",
        title: "Like a snowflake on the tongue",
        hero: "",
        thumbnail: "like-a-snowflake-on-the-tongue.png",
        intro: "Hot outside? Cold inside! That ice melts instantly like a snowflake on your tongue. We found it a few sweats from the Place de la Bastille: at Bältis, the new ice cream parlor in the Marais.",
        content: "Hot outside? Cold inside! That ice melts instantly like a snowflake on your tongue. We found it a few sweats from the Place de la Bastille: at Bältis, the new ice cream parlor in the Marais. On the face of it, it looks like cotton candy. In terms of sensation in the mouth, with angel hair that is more airy because stretched by hand, which comes to style the organic ice creams and sorbets that the two cousins ​​Nadim and Jean-Michel, creators of Bältis, imagined with the help of a MOF*. Traditionally in Lebanon, we eat this thin dough, made from flour and sugar, to accompany coffee or tea, but also as a topping on ice cream. What is this sweet Lebanese cotton called? \"Ghazel el banet\", which means \"charm of women\". The tastes to try first? Orange blossom cream, intense chocolate, apricot and rose water... the Orient in an ice cream cone.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-manger/baltisparisglacierartisanallibanais",
        time: "July 15, 2022"
    },
    {
        id: "BZ24",
        title: "Ho ho ho",
        hero: "",
        thumbnail: "ho-ho-ho.jpeg",
        intro: "According to the latest report from the North Pole, 1 in 2 French people lack inspiration for Christmas gifts, 1 in 3 French people have jotted down ideas all year round but no longer know where and 90% of the population have pronounced the phrase: \"I should have done it sooner\".",
        content: "According to the latest report from the North Pole, 1 in 2 French people lack inspiration for Christmas gifts, 1 in 3 French people have jotted down ideas all year round but no longer know where and 90% of the population have pronounced the phrase: “I should have done it sooner”. The sociologists conclude the study by saying that the solution is to go and see the My Little Paris Christmas gift list. For your sister a strawberry vase, for your life partner a twilight lamp, your grandma a scarf as warm as her madeleines, for your uncle a whiskey oenology course and for your best friend a special notebook. We gathered 50 ideas to pick from. As many original gifts as guests of honor at Christmas this year.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/ventes-privees-shopping/50-cadeaux-noel-2021",
        time: "November 29, 2021"
    },
    {
        id: "BZ25",
        title: "8 pancake recipes for Candlemas",
        hero: "",
        thumbnail: "8-pancake-recipes-for-candlemas.jpeg",
        intro: "Come closer, come closer. Get ready, this weekend it's going to twirl in the kitchens! Sunday is Candlemas. And since you can't make pancakes without breaking eggs, we've prepared 9 pancake recipes for you.",
        content: "Come closer, come closer. Get ready, this weekend it's going to twirl in the kitchens! Sunday is Candlemas. And since you can't make pancakes without breaking eggs, we've prepared 9 pancake recipes for you. There's something for everyone: the quick ones before theater class, the gourmet choco bananas, the audacious ones with coconut milk, the vegan ones without egg or milk... Dig into our salad bowls, and enjoy. And above all, don't you dare leave a single crumb behind.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittlekids.fr/manger/recettes-crepes-chandeleur-8-idees-originales",
        time: "N/A"
    },
    {
        id: "BZ26",
        title: "Castle life!",
        hero: "",
        thumbnail: "castle-life.png",
        intro: "Holidays are an opportunity to set sail in terms of kilometers... but why not also centuries? We have therefore programmed three trips back in time to the four corners of France for escapes with brave knights and unassuming princesses. Get on your proud steed (yes, your car...) and go!",
        content: "Holidays are an opportunity to set sail in terms of kilometers... but why not also centuries? We have therefore programmed three trips back in time to the four corners of France for escapes with brave knights and unassuming princesses. Get on your proud steed (yes, your car...) and go! -The beloved castle of Mads Mikkelsen Between these walls were shot many scenes of \"Michael Koohlhas\", with the sublime Mads Mikkelsen. Located in the Gard, this 12th century castle with its breathtaking view takes you back to the Middle Ages. Marlène, the adorable owner, welcomes you admirably and offers coat of arms or parchment workshops for children. Don't forget to book for our undisputed favourite!, 30450 Aujac. Tel: 04.66.61.19.94 -An enchanted castle 35 kilometers from Paris, the castle of Breteuil celebrates the world of Charles Perrault. At the Lavoir, you will meet Peau-d'Âne, in the old kitchens, the Belle-au-Bois-Dormant. Guided tours are offered for children and a guide for them can be downloaded from the site. A picnic and playground area is also available. Regal, right? The castle of Breteuil , alley of the Castle, 78640 Choisel. Tel: 01 30 52 05 11 - Donkey Skin CastleThis is where Jacques Demy's \"Donkey Skin\" was partially filmed. A few kilometers from Angers, the castle of Plessis-Bourré offers for 6-12 year olds a \"Mitrons and minstrels\" activity around medieval cuisine. Don't miss the alchemical garden either! Château du Plessis-Bourré , 49640 Ecuillé. Phone: 02 41 32 06 72",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/voyager/selection-plus-beaux-chateaux-france-aujac-breteuil-plessis-bourre",
        time: "N/A"
    },
    {
        id: "BZ27",
        title: "The belly of Paris",
        hero: "",
        thumbnail: "the-belly-of-paris.png",
        intro: "There are days when we are a little tired of the Parisian effervescence. We want authenticity, consistency, small neighborhood routines. On these days, go for a walk in the 12th at the end of the morning. Walk along the Faubourg Saint Antoine then take the rue de Cotte. So far everything is calm.",
        content: "There are days when we are a little tired of the Parisian effervescence. We want authenticity, consistency, small neighborhood routines. On these days, go for a walk in the 12th at the end of the morning. Walk along the Faubourg Saint Antoine then take the rue de Cotte. So far everything is calm. But at the end, at the very end, something is going on. It's the belly of Paris that is stirring: welcome to the Marché d'Aligre. Traders sell the best gourmet products at auction. The baskets are filled with colorful and fragrant stalls with juicy oranges and wild strawberries, melting Bellota ham and Provençal olives... at very low prices. Under the covered market, at Philippe's, you can find almost all the 1000 cheeses of France! Ultimate pleasure after the market, meet at the Baron Rouge, the emblematic wine bar of popular Paris to devour on barrels of charcuterie boards and Corsican cheese around a small glass of white wine. Sunday especially, it's the village atmosphere: it overflows on the sidewalks, everyone seems to know each other, a frenzied neighborhood brass band punctuates the cadence of passers-by, plates of oysters pass through their hands and bottles of Sancerre are placed on the hoods of cars. Unmissable meeting to taste the atmosphere of the village of Aligre! Le Baron Rouge. 1 rue Théophile Roussel au Marché d'Aligre Place d'Aligre 75 012 Paris Metro Ledru Rollin. Open daily from 10am to 10pm and Sunday until 4pm",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-boire/le-ventre-de-paris",
        time: "June 26, 2010"
    },
    {
        id: "BZ28",
        title: "Budding critics",
        hero: "",
        thumbnail: "budding-critics.png",
        intro: "Have you ever seen... a duck that didn't like water? A giraffe that had a stiff neck? A mute parrot? No ? Not even a mole that could see super far? Peanuts? So come closer, we present to you the latest exclusive members of the Riquiqui Reading Club.",
        content: "Have you ever seen... a duck that didn't like water? A giraffe that had a stiff neck? A mute parrot? No ? Not even a mole that could see super far? Peanuts? So come closer, we present to you the latest exclusive members of the Riquiqui Reading Club. Some time ago, we recruited a panel of children ready to do battle with the bedtime stories found in McDonald's Happy Meal. The goal? Submit the 7 stories to their clear, spontaneous, incisive opinions (well, we asked their parents a little too). Result ? Our mini literary critics have spoken, and you can find all their opinions directly on the Riquiqui Reading Club. As a bonus, we have even planned a catch-up contest if you missed all these great adventures! And if the circle of little poets had not completely disappeared?",
        contentImages: [""],
        author: { name: "My Little Kids", authorLink: "https://www.mylittlekids.fr/" },
        source: "https://www.mylittlekids.fr/lire-grandir/riquiqui-club-lecture-mcdonalds-livres-avis-bonus",
        time: "N/A"
    },
    {
        id: "BZ29",
        title: "The Orgasmic Roll",
        hero: "",
        thumbnail: "the-orgasmic-roll.png",
        intro: "Everything born in New York lands in Paris one day. Like the New York Roll, which appeared one fine autumn day in the window of the BO&MIE bakery, and has already been devoured by thousands of Parisians.",
        content: "Everything born in New York lands in Paris one day. Like the New York Roll, which appeared one fine autumn day in the window of the BO&MIE bakery, and has already been devoured by thousands of Parisians. It has to be said that it has quite a pretty face, this round croissant, with its bronze color and dripping chocolate sauce on a puff pastry and caramelized. At the first croc, we stained our sweater as if we were 4 years old. On the second, oh surprise: unexpected explosion of vanilla cream in the mouth, hidden in the heart of the Roll . On the third, hands lined with cream and mouth smeared with chocolate. We looked smart. But fulfilled. “New York Roll”: ephemeral creation by BO&MIE, €4.20. 18 rue de Turbigo, Paris 2nd, 359 rue Saint-Martin, Paris 3rd or 91 rue de Rivoli, Paris 1st. Attention, batch limited to 30 New York Rolls per day!",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-manger/new-york-roll-boetmie",
        time: "November 8, 2022"
    },
    {
        id: "BZ30",
        title: "Santa's Inn",
        hero: "",
        thumbnail: "santas-inn.gif",
        intro: "“Dear Father Christmas, when you do your rounds of chimneys, don't you dare go down to the one at 28 rue de Turin: you risk landing on a hot rib of beef. Because  yes, this photo of a country inn was indeed taken in Paris. More precisely in the 8th, at Albert, the owner of the Le Rouge et le Verre wine cellar.",
        content: "“Dear Father Christmas, when you do your rounds of chimneys, don't you dare go down to the one at 28 rue de Turin: you risk landing on a hot rib of beef. Because  yes, this photo of a country inn was indeed taken in Paris. More precisely in the 8th, at Albert, the owner of the Le Rouge et le Verre wine cellar. It was Sylvie, his bookseller wife, who came up with the name, and it is Albert who officiates in this cellar with 450 wine references from all regions and all faiths: the Nature, festive, everyday, and seasonal. People come here to choose a bottle, or have lunch by the fireplace with one of the dishes cooked with market produce. We come here to share a tender Black Angus rib of beef cooked on the fireplace grill. We come there, and we come back so much, that some regulars even have napkin rings in their name. “Dear Father Christmas, don't go through the fireplace, but remember to reserve one of the two tables just in front. » Le Rouge et le Verre, 28 rue de Turin, 75 008 Paris. Wine cellar and table d'hôtes for lunch and dinner, Monday to Saturday. Black Angus beef rib to share, €35 per person. Reservation on 01 43 87 10 40  (ask for the table in front of the fireplace) Other address (also with a fireplace), 33 rue de Brunel, 75 017 Paris",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-boire/le-rouge-et-le-verre",
        time: "December 07, 2022"
    },
    {
        id: "BZ31",
        title: "Buckwheat tea",
        hero: "",
        thumbnail: "buckwheat-tea.jpeg",
        intro: "Breton purists will tell you themselves, a good candlestick is made with buckwheat and a well (well) dosed touch of butter. Nothing more, nothing less.",
        content: "Breton purists will tell you themselves, a good candlestick is made with buckwheat and a well (well) dosed touch of butter. Nothing more, nothing less. Today, we put buckwheat everywhere. In plates and coffee cups. You know it in flour, but buckwheat is also available in infusion and in Japan, it is called Sobacha . With its slightly bitter coffee-like taste without sugar, sobacha is the detox drink to pick up at Japanese women and bargain hunt at Breizh . To be taken in the morning to boost your inner self and in the evening to find a little calm after dinner. Galette fork in one hand, cup of sobacha in the other. Here is your Parisian Candlemas halfway between Saint-Malo and Tokyo. Prescription infusion-candlemas at the Breizh Café grocery store  111, rue Vieille du Temple, 75003 Paris. Open every day from 10am to 10pm. Sobacha, €12.50 for 100g. Galettes from €8.50. On site, take away or delivery.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-boire/sobacha-chandeleur-sarrasin",
        time: "February 01, 2022"
    },
    {
        id: "BZ32",
        title: "“There is debate”",
        hero: "",
        thumbnail: "there-is-debate.gif",
        intro: "Should a person be warned that they have a piece of lettuce stuck between their teeth? What is the maximum number of items tolerated to ask to pass in front of everyone in the supermarket? Can we applaud when landing on the plane? Our answer to these questions: \"There is debate.\"",
        content: "Should a person be warned that they have a piece of lettuce stuck between their teeth? What is the maximum number of items tolerated to ask to pass in front of everyone in the supermarket? Can we applaud when landing on the plane? Our answer to these questions: \"There is debate.\" Inspired by the very judicious \"How To Behave\" of New York Mag, about the new codes of life of the post-Covid era, the My Little Paris team gathered around a table to discuss new unspoken rules of Parisian life: metro, professional life, social networks... What's ok? What is not done? 130 topics we ask here. The debates are open.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/vies-parisiennes/y-a-debat",
        time: "May 05, 2023"
    },
    {
        id: "BZ33",
        title: "3 hot coffees to take away",
        hero: "",
        thumbnail: "3-hot-coffees-to-take-away.png",
        intro: "In these freezing weather and closed cafes, the only thing left to do is to take them away. Hot, latte, turmeric, chaï, tight, oatmeal, cocoa... 3 sidewalk cafés for a stroll with friends or a date on the go in Paris.",
        content: "Of course you have to climb: we are in Montmartre! But it's so worth the effort to climb up to this \"Melbourne à Montmartre\" atmosphere café, to order a Golden Latte or a Piccolo Latte with hazelnuts. The baristas to greet: Fred and Charlotte. To take away in the other hand: a chocolate-praline shortbread. Le Café-Tabac  , 1bis Rue Ravignan, 75018 Paris, €2 for an espresso, Monday to Friday from 8:30 a.m. to 1 p.m., weekends from 9 a.m. to 3 p.m. can choose your milk: cow, soy, oats, almond, hazelnut. Boulevard des filles du Calvaire, a Breton canteen has just opened its eyes: the Joa café, which means \"joy\" in Breton, where Anne-Charlotte, fresh out of her training at the Lomi roasting school, prepares smooth filter coffees and full-bodied espressos. The barista to greet: Anne-Charlotte. To take away in the other hand:  the brioche bread-buns or the dark-chocolate cookies and mashed cashew nuts. Café Joa , 20 boulevard des filles du Calvaire, 75003 Paris, €2.50 for an espresso, open 8:30 a.m. to 5 p.m. Monday to Friday, 10 a.m. to 5 p.m. Saturday and Sunday. Closed on Tuesdays. It's not just coffee lovers in life: the passionate tea hunters at Chez Thé-ritoires offer tea to take away every week. There was black tea from Malawi, Chinese green tea, and from Monday we're betting everything on Early Grey. The Théristas to salute (no, this word does not yet exist): Arnaud and Maxime. To take away in the other hand : the scone, 5€ for both. Thé-ritoires, 5 Rue de Condé, 75006 Paris, open Tuesday to Saturday 10:30 a.m. to 5:45 p.m., €4 for tea and €3.50 if you bring your own cup. And if you miss the sound of Parisian cafes, listen to it here in our playlist of the sounds of Paris that we have forgotten.",
        contentImages: [""],
        author: { name: "My Little Paris", authorLink: "https://www.mylittleparis.com/" },
        source: "https://www.mylittleparis.com/resto-bars-ou-boire/cafe-joa",
        time: "February 12, 2021"
    },


    // {
    //     id: "BZ",
    //     title: "",
    //     hero: "",
    //     thumbnail: "",
    //     intro: "",
    //     content: "",
    //     contentImages: [""],
    //     author: { name: "", authorLink: "" },
    //     source: "",
    //     time: ""
    // },
]

const aboutContent = "Ablaze Blog is an online digital blogging platform where you can share your unique, memorable experience with your family, friends, and other people across the world.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const popularAuthors = [
    { name: "Emilia", points: 89000, image: "emilia.png" },
    { name: "Balancer", points: 100000, image: "thebalancer.png" },
    { name: "Rem", points: 78000, image: "rem.png" },
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

    res.render("home", { 
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
    res.render("user-account", { blogpostPost: blogpostPosts});
});


app.listen(port, () => {
    console.log(`Ablaze's server started on port http://localhost:${port}`);
});
