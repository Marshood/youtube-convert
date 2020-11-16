import { React, useState } from 'react';
import download from 'downloadjs';
import Loader from 'react-loader-spinner';
import './facebook.css'
import { FcNext } from "react-icons/fc";
import { SocialIcon } from 'react-social-icons';
export default function FacebookConvertPage() {
    const [LoaderT, setLoader] = useState(false); // to show the loader icon
    const [urlInput, setUrlInput] = useState(''); // to save the url input
    const [urlOutpot, setUrlOutpot] = useState(''); // save blobr
    const [pointerEvents, setpointerEvents] = useState(false)// to stop pointer events while video processing
    const [selectedOption, seTselectedOption] = useState('mp4');//save file format 
    const [btnDownload, setBtnDownload] = useState(false); // to show download button 
    const [show, setShow] = useState(false); //to show alert 
    const [showTitle, setShowTitle] = useState(); // to show the title for the video on the screen 
    const [fileName, setFileName] = useState("Downloading") // set file name to download
    const [VideoID, setVideoID] = useState('KrMIczw4Dng');
    const [ShowVideo, setShowVideo] = useState(true);
    const [FBV, setFBV] = useState('https://www.youtube.com/embed/KrMIczw4Dng')
    //to set the foramt
    const handleChange = selectedOption => {
        seTselectedOption(selectedOption.target.value);
    };
    //Alert hide
    function AlertHide() {
        setShow(false)
        ClearFields()
    }
    // clear all the fields 
    function ClearFields() {
        console.log("ClearFields on process...");
        setUrlInput('')
        setBtnDownload(false)
        setFileName("Downloading")
        setShowTitle();
        setShowVideo(false);
        setVideoID('');
    }
    function clearInputData() {
        setShowVideo(false)
        setBtnDownload(false)
        setShowTitle();
        setVideoID('');
    }
    return (
        <div className={pointerEvents ? "facebook__container pointerEvents" : "facebook__container"}>
            <script data-ad-client="ca-pub-1844108616693955" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <div className="facebook__header">
                <h1  >Facebook Converter </h1>
            </div>

            <main className="facebook__mainO">
                <div className="facebook__main">
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        secondaryColor="Grey"
                        height={100}
                        width={100}
                        //  timeout={3000} //3 secs
                        visible={LoaderT} />
                    {show &&
                        <div class="alert">
                            <span class="closebtn" onClick={AlertHide}>&times;</span>
                            <strong>Error! </strong> <br></br>This video might be private and not public. <br></br>
                            Our system was not able to detect any video at the adress you provided.. Please, double check the url. <br></br>
                             If you are sure that this page has a video, contact us to see if it can be added to the list of supported sites..
                       </div>

                    }
                    {!show &&
                        <form onSubmit={(e) => sendLinkProcessing(e)}  >

                            <h1>Please insert a valid video URL</h1>
                            <br></br>
                            <div className="form_style_input">
                                <input type="text" id="LinkURL" name="urlyoutube" value={urlInput} onChange={(e) => { setUrlInput(e.target.value); clearInputData(); } } required/><br />
                                <p className="PFontSize">Format:</p>

                                <select onChange={handleChange} name="cars" id="cars">
                                    <option value="mp4">MP4/ Video</option>
                                    <option value="mp3">MP3/ Audio</option>

                                </select>

                                <br></br>
                                <h4>
                                    {showTitle}
                                </h4>
                                {ShowVideo &&
                                    <iframe width="auto" height="auto" src={`${FBV}`} frameborder="0" allowfullscreen>
                                    </iframe>
                                }
                                <br></br>
                                {
                                    btnDownload
                                    &&
                                    <a className="button hideBtnDownload" href={urlOutpot} download={`${fileName}.${selectedOption}`} onClick={ClearFields} >Click to Downloadt</a>
                                }
                                {
                                    !btnDownload
                                    &&
                                    <button className="button" type="submit">Convert </button>
                                }

                            </div>
                        </form>

                    }

                </div>
            </main>

            {/* <div id="sidebar">Sidebar</div> */}
            <div className="facebook__about">
                <p><h2> Facebook Converter</h2></p>
                <p>
                    By using our converter you can easily convert Facebook videos to mp3 or mp4 files and download them for free - this service works for computer and mobile devices.
                    <br></br> <br></br>
                    The videos are always converted in the highest available quality. Please note that we can only convert videos up to a length of 1.5 hour - the limitation is necessary, so the conversion of any video will not take more than a couple of secunds.
                    <br></br> <br></br>

                    To convert a video, copy the YouTube video URL into our converter, choose a format and click the convert button. As soon as the conversion is finished the file automatically downloaded.                    <br></br> <br></br>
                    Enjoy! We hope you like our service.
                </p>
            </div>

            <div className="facebook__appUse">
                {/* BsArrowRightShort */}
                <h1>How to use our Facebook Converter</h1>

                <p> <FcNext size={32} /> Copy a video link
                In order to convert your file, you’ll need to choose a video first. So go ahead and visit YouTube  and copy a link to the video that you’d like to get converted
                </p>
                <p>    <FcNext size={32} /> Paste the copied link into the input field
                Paste the link for a video that you want into the ‘Please insert a valid video URL’ field
                </p>
                <p>

                    <FcNext size={32} /> Choose the file format you want
                        </p>
                <p>  <FcNext size={32} /> Click Convert to get mp3/ mp4 file
                This is the last step! All you have to do now is to click convert and wait just a little bit for your file to get converted.
                </p>
            </div>

            <footer>
                <p><small>&copy; 2020 - Marshood Ayoub</small></p>
                <SocialIcon url="https://www.linkedin.com/in/marshoodayoub/" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://github.com/Marshood" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://www.facebook.com/marshoodayoub" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://www.instagram.com/marshood1/" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://www.youtube.com/user/marshood94" style={{ height: 25, width: 25 }} />
            </footer>
        </div >

    )

    function sendLinkProcessing(e) {
        e.preventDefault();
        setLoader(true);
        setpointerEvents(true);
        const YTURL = e.target.urlyoutube.value;
        checkURL(YTURL);
        console.log("YTURL 20: ", YTURL);
        // UrlConvert(YTURL);

        // getVideo(YTURL)
        // download(YTURL)
    }

    function checkURL(url) {
        console.log("url ", url)
        fetch('/api/facebook/getdetailsFB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    url: url,
                })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.title)
                if (data.DL) {
                    console.log("succes")
                    UrlConvert(url);
                    setFileName(data.DL.title);
                    setShowTitle(data.DL.title);
                    setVideoID(data.id)
                    setFBV(data.VDATA)
                    setShowVideo(true);
                }
                else {
                    console.log("title error")
                    console.log("error to convert the video try again!!")
                    setShow(true)
                    setLoader(false);
                    setpointerEvents(false);
                    setShowVideo(false);
                }
            });

    }



    async function UrlConvert(YTURL) {
        console.log("starting video convert....")
        // getVideoName(YTURL)
        fetch('/api/facebook/convertUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    YTURL: YTURL,
                    selectedOption: selectedOption
                })
        }).then(function (response) {
            console.log("statuss", response.status); // returns 200
            response.blob().then(data => {
                console.log("blob size:data   ", data)
                if (data.size > 1000) {
                    console.log("data 37:", data, Date())
                    let url = window.webkitURL.createObjectURL(data);
                    console.log("url", url)
                    let a = document.createElement('a');
                    a.href = url;
                    // setUrlInput(url)
                    setUrlOutpot(url)
                    setLoader(false);
                    setpointerEvents(false);
                    setBtnDownload(true)
                    a.download = `mployees.${selectedOption}`;
                    //a.click();
                    console.log("colling func");
                    // getVideoName(YTURL)
                }
                else {
                    console.log("error to convert the video try again!!")
                    setShow(true)
                    setLoader(false);
                    setpointerEvents(false);
                }
            })
        })
    }





}