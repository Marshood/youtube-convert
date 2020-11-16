const express = require("express");
const router = express.Router();
const facebookGetLink = require('facebook-video-link');
const fbvdideo = require('fb-video-downloader')
const fbvid = require('fbvideos');
const youtubedl = require('youtube-dl')


router.post('/getdetailsFB', async function (req, res) {
    const { url } = req.body;
    // fbvdideo.getInfo(url)
    //     .then((info) => {
    //         console.log(JSON.stringify(info, null, 2))
    //         // res.send(info.link)
    //     }
    //     );
    // console.log("getdetailsFB ..", "utl: ", url)
    facebookData = facebookGetLink(url).then(response => {
        // console.log(response)
        fbvid.high(url).then(vid => {
            // console.log(vid);
            res.send({ "DL": response, "VDATA": vid.url })
        });

    })


})


// this method to get the video and convert it and send to the client
router.post('/convertUrl', async function (req, res) {
    // console.log("convertUrlFB..", Date())
    const { YTURL, selectedOption } = req.body;
    // console.log("YTURL: ", YTURL, " selectedOption: ", selectedOption)
    var videopromise12
    var options = ['--extract-audio',
        '--audio-format', 'mp3',
        '--audio-quality', '7'
    ];
    try {
        youtubedl.getInfo(YTURL, ['--youtube-skip-dash-manifest'], function (err, info) {

            if (err) return res.send(
                { error: 'The link you provided either not a valid url or it is not acceptable' });
            else {
                // console.log("next :...")
                // console.log("title ", info.title)
            }
        })
        videopromise12 = youtubedl(YTURL);
        videopromise12.on("close", () => {
            //  console.log("all done!!!") 
    })

        // console.log("Sending file...")
        res.send(videopromise12.pipe(res))
    } catch (e) {
        // console.log("error ", e);
    }
})


module.exports = router;