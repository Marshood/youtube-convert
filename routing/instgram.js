const express = require("express");
const router = express.Router();
const youtubedl = require('youtube-dl')
let request = require('request');

var cheerio = require('cheerio');


var followers = [];

router.post('/Getdetails',async function (req,res){
    const { url} = req.body;
    console.log("request coming in...","url: ",url);
    let video_url =url;
    console.log(JSON.stringify(req.query));
    if(video_url !== undefined){

        if(video_url.substring(0,8) === 'https://' || video_url.substring(0,7) === 'http://' 
                || video_url.substring(0,21) === 'https://www.instagram' || video_url.substring(0,20) === 'http://www.instagram.com')
                {

            request(video_url, (error, response, html) => {
                if(!error){
                    console.log('Insta_grab : '+video_url+' : Loaded');
                    let $ = cheerio.load(html);

                    //basic data from the meta tags
                    let video_link = $('meta[property="og:video"]').attr('content');
                    let file = $('meta[property="og:type"]').attr('content');
                    let url = $('meta[property="og:url"]').attr('content');
                    let title = $('meta[property="og:title"]').attr('content');
                    res.status(200).json({ title, url, file, video_link});
                    
                }else{
                    res.status(400).json({ 'message' : 'Error, Unable to load webpage'});
                }
            });
        }else{
            res.status(201).json({ 'message' : 'Invalid URL'});
        }
    }else{
        res.status(400).json({ 'message' : 'Provided invalid URL'});
    }
  
  })



















module.exports = router;
