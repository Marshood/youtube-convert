const express = require('express');
const { env } = require('yargs');
const app = express();
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser')
const youtubedl = require('youtube-dl')
const path=require('path');

 // ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'https://ytconvert.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}



app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
// app.use(express.static("public"));
 app.use(express.static(path.join(__dirname,'client/build')));
//handle react routing retun all requsts to react app
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'client/build','index.html'))
})

const youtubeRouter = require("./routing/youtube");
app.use("/api/youtube", youtubeRouter);

const facebookRouter = require("./routing/facebook");
app.use("/api/facebook", facebookRouter);

const instgramRouter = require("./routing/instgram");
app.use("/api/instgram", instgramRouter);
const contactTouter = require("./routing/contact");
app.use("/api/contact", contactTouter);

 


 



// listen to the post 
app.listen(port, () => { console.log("App listen to port: ", port) })