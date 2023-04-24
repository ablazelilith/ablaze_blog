const express = require("express");
const ejs = require('ejs');
const localPort = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Ablaze");
});

app.post("/", (req, res) => {

});

app.listen(localPort, () => {
    console.log("Ablaze server started on port http://localhost:" + localPort);
});
