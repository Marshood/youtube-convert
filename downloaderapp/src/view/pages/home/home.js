import { React, useState } from 'react';
import download from 'downloadjs';
import Loader from 'react-loader-spinner';
import './home.css'
import { FcNext } from "react-icons/fc";
import Select from 'react-select';
import { IconContext } from "react-icons";
import { useAlert } from "react-alert";
import Alert from 'react-bootstrap/Alert'
 export default function Home() {
    const [LoaderT, setLoader] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [pointerEvents, setpointerEvents] = useState(false)
    const [selectedOption, seTselectedOption] = useState('mp4');
    const [btnDownload, setBtnDownload] = useState(false);
    const [show, setShow] = useState(false);
    
    const options = [
        { value: 'mp3', label: 'mp3' },
        { value: 'mp4', label: 'mp4' },
    ];
    const handleChange = selectedOption => {
         seTselectedOption(selectedOption.target.value);
        console.log(`Option selected:`, selectedOption.target.value);
    };
    function AlertHide( ) {
         setShow(false)
         ClearFields()
    }  
    function ClearFields() {
        console.log("ClearFields on process...");
        setUrlInput('')
        setBtnDownload(false)
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
                        <form onSubmit={(e) => sendLink(e)}  >

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
                                <br></br>
                                {
                                    btnDownload
                                    &&
                                    <a className="button hideBtnDownload" href={urlInput} download={`test.${selectedOption}`} onClick={ClearFields} >Click to Downloadt</a>
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

    function sendLink(e) {
        e.preventDefault();
        setLoader(true);
        setpointerEvents(true);
        const YTURL = e.target.urlyoutube.value;
        console.log("YTURL 20: ", YTURL)
        marshoodtest(YTURL);
        // getVideo(YTURL);
        // fetch("/")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data)
        //     });

        // fetch('/sendUrlYoutubetest', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(
        //         {
        //             YTURL: YTURL
        //         })
        // })
        //     .then(response => response.blob())
        //     .then(data => {

        //         console.log("data 37:", data)
        //         let url = window.URL.createObjectURL(data);
        //         console.log("url", url)
        //         let a = document.createElement('a');
        //         a.href = url;
        //         a.download = 'employees.mp4';
        //         a.click();

        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    }

    async function marshoodtest(YTURL) {
        console.log("6969")
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
                console.log("blob size:  ", data.size)
                if (data.size > 1000) {
                    console.log("data 37:", data, Date())
                    let url = window.webkitURL.createObjectURL(data);
                    console.log("url", url)
                    let a = document.createElement('a');
                    a.href = url;
                    setUrlInput(url)
                    setLoader(false);
                    setpointerEvents(false);
                    setBtnDownload(true)
                    a.download = `mployees.${selectedOption}`;
                    //a.click();
                }
                else {
                    console.log("error to convert the video try again!!")
                    setShow(true)
                    setLoader(false);
                    setpointerEvents(false);
                }

            })

        })


        //  .then(response =>  response.blob())
        // .then(data => {
        //        console.log("test ",data.headers) 
        //     console.log("data 37:", data, Date())
        //     let url = window.webkitURL.createObjectURL(data);
        //     console.log("url", url)
        //     let a = document.createElement('a');
        //     a.href = url;
        //     setLoader(false);
        //     setpointerEvents(false);
        //     a.download = 'employees.mp3';
        //     a.click();


        // }) 

    }

    async function getVideo(URL) {
        console.log('getvideo URL', URL);

        const response = await fetch('/sendUrlYoutubetest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    YTURL: URL
                })
        })
            .then(response => {
                //buffer to fill with all data from server
                let pdfContentBuffer = new Int8Array();

                // response.body is a readableStream
                const reader = response.body.getReader();

                //function to retreive the next chunk from the stream
                function handleChunk({ done, value }) {
                    if (done) {
                        //everything has been loaded, call `download()` to save gthe file as pdf and name it "my-file.pdf"
                        download(pdfContentBuffer, `my-file.mp3`, 'audio/mpeg')
                        return;
                    }
                    console.log("Loading..", value.length, " value")
                    // concat already loaded data with the loaded chunk
                    pdfContentBuffer = Int8Array.from([...pdfContentBuffer, ...value]);
                    console.log("Loading..")

                    // retreive next chunk
                    reader.read().then(handleChunk);
                }

                //retreive first chunk
                reader.read().then(handleChunk)
            })
            .catch(err => console.error(err))
        // const reader = response.body.getReader();
        // console.log("reader", reader)
        // while (true) {
        //     const { value, done } = await reader.read();
        //     if (done){


        //         break; 
        //     }  
        //     // console.log('Received', value);
        // }

        // console.log('Response fully received');
    }



}