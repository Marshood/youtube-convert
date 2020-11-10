const express = require('express');
const { env } = require('yargs');
const app = express();
const port = process.env.PORT || 4000;
var bodyParser = require('body-parser')
const ytdl = require('ytdl-core');
const output = 'myvideo.mp4'
const fileSystem = require('fs');
const path = require('path');
let downloaded = 0

const youtubedl = require('youtube-dl')

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.get('/111', function (req, res) {
  console.log("a");
  res.send({ "test": "test" })
})

app.post('/sendUrlYoutube', function (req, res) {

  console.log(req.body);

  var filePath = path.join(__dirname, 'myfile.mp3');
  var stat = fileSystem.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });

  var readStream = fileSystem.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);

})


app.post('/sendUrlYoutubetest', function (req, res) {
  const { YTURL } = req.body;
  // var options = ['--extract-audio',
  //   '--audio-format', 'mp3',
  //   '--audio-quality', '7'
  // ];
  // var video = youtubedl(YTURL, options);
  // video.on('info', function (info) {
  //   console.log('Download started')
  //   console.log('filename: ' + info._filename)
  //   console.log('size: ' + info.size)
  //   //   console.log('id:', info.id)
  //   //   console.log('title:', info.title)
  //   //   //console.log('url:', info.url)
  //   //   console.log('thumbnail:', info.thumbnail)
  //   //   console.log('description:', info.description)
  //   //   console.log('filename:', info._filename)
  //   //   console.log('format id:', info.format_id)
  // })

  // video.pipe(fileSystem.createWriteStream('myvideo.mp4'))

  res.header("Content-Disposition", `attachment; filename="${YTURL}.mp4"`);
  console.log("Send file")
  // ytdl(YTURL, {
  // 	format: "mp4"
  // }).pipe(res);

  //////
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "bigbuck.mp4";
  const videoSize = fileSystem.statSync("bigbuck.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fileSystem.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);

})
app.post('/convertUrl', async function (req, res) {
  console.log("convertUrl..", Date())
  const { YTURL, selectedOption } = req.body;
  console.log("YTURL: ", YTURL, " selectedOption: ", selectedOption)
   var videopromise12
  var options = ['--extract-audio',
    '--audio-format', 'mp3',
    '--audio-quality', '7'
  ];
  try {
    videopromise12 = youtubedl(YTURL, options);
    /*
    videopromise12.on('info', function (info) {
      console.log('Download started')
      console.log('filename: ' + info._filename)
      console.log('size: ' + info.size)
      //   console.log('size: ' + info.size)
      //   console.log('id:', info.id)
      //   console.log('title:', info.title)
      //   //console.log('url:', info.url)
      //   console.log('thumbnail:', info.thumbnail)
      //   console.log('description:', info.description)
    })*/
    // res.header("Content-Disposition", `attachment; filename="asd.mp4"`);
    console.log("Sending file...")
    res.send(videopromise12.pipe(res))

  } catch (e) {
    console.log("error ");
    //  res.send({ "test": URL })
 
  }
  // res.send({ "test": URL })
})



app.listen(port, () => { console.log("App listen to port: ", port) })