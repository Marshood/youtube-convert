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





// this method to get the video name and send to the client
app.post('/getvideoname', function (req, res) {
  const { YTURL } = req.body;
  console.log("getvideoname: ", YTURL)
  var video;
  video = youtubedl(YTURL);  
  const VideoCOnvert = new Promise((resolve, reject) => {
    video.on('info', function (info) {
      console.log('getvideoname.....')
      console.log('filename: ' + info._filename)
      console.log('size: ' + info.size)
      resolve(info._filename);

    })
  });
  VideoCOnvert.then((value) => {
    console.log("value 4343 ", value);
    res.send({ "name": value });
 

  });
 
});

// this method to get the video and convert it and send to the client
app.post('/convertUrl', async function (req, res) {
  console.log("convertUrl..", Date())
  const { YTURL, selectedOption } = req.body;
  console.log("YTURL: ", YTURL, " selectedOption: ", selectedOption)
  var videopromise12
  var options = ['--extract-audio',
    '--audio-format', 'mp3',
    '--audio-quality', '7'
  ];
  const testHeasre = 'marshood'
  try {
    videopromise12 = youtubedl(YTURL, options);

    // res.header("Content-Disposition", `attachment; filename="Marshood.mp4"`);
    // const VideoCOnvert = new Promise((resolve, reject) => {
    //   videopromise12.on('info', function (info) {
    //     console.log('Download started')
    //     console.log('filename: ' + info._filename)
    //     console.log('size: ' + info.size)
    //     resolve(info._filename);

    //   })
    // });

    // VideoCOnvert.then((value) => {
    //   console.log("value", value);
    //   // res.writeHead(200, { "hola": "value" });

    // });


    console.log("Sending file...")

    res.send(videopromise12.pipe(res))
  } catch (e) {
    console.log("error ");

  }
})




// listen to the post 
app.listen(port, () => { console.log("App listen to port: ", port) })