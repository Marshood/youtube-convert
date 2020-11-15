const express = require('express');
const { env } = require('yargs');
const app = express();
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser')
const youtubedl = require('youtube-dl')

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(express.static("public"));


const youtubeRouter = require("./routing/youtube");
app.use("/api/youtube", youtubeRouter);

const facebookRouter = require("./routing/facebook");
app.use("/api/facebook", facebookRouter);


 


 



// listen to the post 
app.listen(port, () => { console.log("App listen to port: ", port) })