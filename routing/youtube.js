 const express = require("express");
const router = express.Router();
const youtubedl = require('youtube-dl')

// this method to get the video name and send to the client
router.post('/getvideoname', function (req, res) {
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
  router.post('/convertUrl', async function (req, res) {
    console.log("convertUrl..", Date())
    const { YTURL, selectedOption } = req.body;
    console.log("YTURL: ", YTURL, " selectedOption: ", selectedOption)
    var videopromise12
    var options = ['--extract-audio',
      '--audio-format', 'mp3',
      '--audio-quality', '7'
    ];
    try {
        youtubedl.getInfo(YTURL, ['--youtube-skip-dash-manifest'], function (err, info) {
  
        if (err) return res.send(
          { error: 'The link you provided either not a valid url or it is not acceptable' });
        else{
          console.log("next :...")
          console.log("title ",info.title)
          // console.log("Sending file...")
          // res.send(videopromise12.pipe(res))
      }
      })
      videopromise12 = youtubedl(YTURL);
      videopromise12.on("close", () => { console.log("all done!!!") })
      console.log("Sending file...")
      res.send(videopromise12.pipe(res))
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
    
      
  
    } catch (e) {
      console.log("error ", e);
  
    }
  })
  
  
  router.post('/checkURL',async function (req,res){
    const { url} = req.body;
     youtubedl.getInfo(url, ['--youtube-skip-dash-manifest'], function (err, info) {
      console.log('cheking url')
      if (err) return res.send(
        { title:null ,error: 'The link you provided either not a valid url or it is not acceptable' });
      else{
        console.log("next :...")
        console.log("title ",info.title)
        // console.log("Sending file...")
        res.send({title:info.title,error:null, id: info.id})
    }
    })
  
  })


  //******************************************************* */

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };
  var request = require('request');
  
  router.post('/video', function (req, res, next) {
    console.log("check video")
    var url = req.body.url,
      formats = [],
      pattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  
    request.get(url, function (err, resp, body) {
      // check if it is valid url
      if (pattern.test(resp.request.uri.href)) {
        video = youtubedl.getInfo(url, ['--youtube-skip-dash-manifest'], function (err, info) {
          if (err) return res.send(
            { meta: null, error: 'The link you provided either not a valid url or it is not acceptable' });
  
          // push all video formats for download (skipping audio)
          info.formats.forEach(function (item) {
            if (item.format_note !== 'DASH audio' && item.filesize) {
              item.filesize = item.filesize ? bytesToSize(item.filesize) : 'unknown';
              // console.log("item", item)
              formats.push(item);
            }
          });
          res.send({ meta: { id: info.id, formats: formats, error: null } });
          // res.send(formats[0].url);
  
        })
  
      }
      else {
        res.send({ meta: null, error: 'The link you provided either not a valid url or it is not acceptable' });
      }
    });
  
  });
  
  module.exports = router;