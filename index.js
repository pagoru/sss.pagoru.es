/**
 * Created by Pablo on 04 Aug 17.
 */
const path = require("path");

const http = require('http');

const express = require("express");
const app = express();

const lessMiddleware = require("less-middleware");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "pug");

require("./sss/index")(app);

app.all("*", (req, res) => {
    res.send('No tengo ni idea que poner aquí. - <a href="https://twitter.com/pagoru_">@pagoru_</a><br /><br /><a href="/sss">super secret settings</a>');
});

const port = 3000;
http.createServer(app).listen(port, () => {
    console.log(`http ready @ ${port}`);
});