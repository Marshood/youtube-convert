import { React, useState } from 'react';
import download from 'downloadjs';
import Loader from 'react-loader-spinner';
import './home.css'
import { FcNext } from "react-icons/fc";
import DownloadLink from "react-download-link";

import { IconContext } from "react-icons";
export default function Home() {
    const [LoaderT, setLoader] = useState(false); // to show the loader icon
    const [urlInput, setUrlInput] = useState(''); // to save the url input
    const [urlOutpot, setUrlOutpot] = useState(''); // save blobr
    const [pointerEvents, setpointerEvents] = useState(false)// to stop pointer events while video processing
    const [selectedOption, seTselectedOption] = useState('mp4');//save file format 
    const [btnDownload, setBtnDownload] = useState(false); // to show download button 
    const [show, setShow] = useState(false); //to show alert 
    const [showTitle, setShowTitle] = useState(); // to show the title for the video on the screen 
    const [fileName, setFileName] = useState("Downloading") // set file name to download

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
        setShowTitle()
    }
    return (
        <div className={pointerEvents ? "container pointerEvents" : "container"}>
            <div className="header">
                <h1  >Youtube Converter </h1>
            </div>

            <main>
                <div className="main">
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
                            <strong>Error!</strong> Your link invalid, Please try again
                      </div>

                    }
                    {!show &&
                        <form onSubmit={(e) => sendLinkProcessing(e)}  >

                            <h2>Please insert a valid video URL</h2>
                            <br></br>
                            <div className="form_style_input">
                                <input type="text" id="LinkURL" name="urlyoutube" value={urlInput} onChange={(e) => { setUrlInput(e.target.value) }} /><br />
                                <p className="PFontSize">Format:</p>

                                <select onChange={handleChange} name="cars" id="cars">
                                    <option value="mp4">mp4</option>
                                    <option value="mp3">mp3</option>

                                </select>

                                <br></br>
                                <h4>
                                    {showTitle}
                                </h4>
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
            <div className="about">
                <h2> YouTube Converter</h2>
                <p>
                    By using our converter you can easily convert YouTube videos to mp3 or mp4 files and download them for free - this service works for computer and mobile devices.
                    <br></br> <br></br>
                    The videos are always converted in the highest available quality. Please note that we can only convert videos up to a length of 1.5 hour - the limitation is necessary, so the conversion of any video will not take more than a couple of secunds.
                    <br></br> <br></br>

                    To convert a video, copy the YouTube video URL into our converter, choose a format and click the convert button. As soon as the conversion is finished the file automatically downloaded.                    <br></br> <br></br>
                    Enjoy! We hope you like our service.
                </p>
            </div>

            <div className="appUse">
                {/* BsArrowRightShort */}
                <h2>How to use our YouTube Converter</h2>

                <FcNext size={32} /> Copy a video link
                In order to convert your file, you’ll need to choose a video first. So go ahead and visit YouTube  and copy a link to the video that you’d like to get converted
                <br></br><br></br>
                <FcNext size={32} /> Paste the copied link into the input field
                Paste the link for a video that you want into the ‘Please insert a valid video URL’ field
                <br></br><br></br>
                <FcNext size={32} /> Choose the file format you want
                 <br></br><br></br>
                <FcNext size={32} /> Click Convert to get mp3/ mp4 file
                This is the last step! All you have to do now is to click convert and wait just a little bit for your file to get converted.

            </div>

            <footer>
                <small>&copy; 2020 - Marshood Ayoub</small>

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

    function checkURL(url){
        console.log("url ",url)
        fetch('/checkURL', {
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
            console.log(data.title )
            if(data.title!=null)
            { console.log("title succes")
                UrlConvert(url);
                setFileName(data.title);
                setShowTitle(data.title);
            }
            else{
                console.log("title error")
                console.log("error to convert the video try again!!")
                setShow(true)
                setLoader(false);
                setpointerEvents(false);
            }
        });

    }



    function getVideoName(YTURL) {
        console.log("getVideo title....")
        fetch('/getvideoname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    YTURL: YTURL,
                })
        }).then(response => response.json())
            .then((jsonData) => {
                setFileName(jsonData.name)
                setShowTitle(jsonData.name)
                console.log("name ", fileName, "  jsonData", jsonData.name)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    async function UrlConvert(YTURL) {
        console.log("starting video convert....")
        // getVideoName(YTURL)
        fetch('/convertUrl', {
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

    async function getVideo(URL) {
        console.log('getvideo URL', URL);

        const response = await fetch('/video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    url: URL
                })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setUrlInput(data.meta.formats[0].url)
                console.log("testdata: ", data.meta.formats[0].url)
                setpointerEvents(false);
                console.log("urll", data.meta.formats[0].url);
                download(data.meta.formats[0].url)
            })
            .catch(err => console.error(err))
    }

    


}