import { React, useState } from 'react';
import download from 'downloadjs';
import Loader from 'react-loader-spinner';
import './home.css';
import { FcNext, FcAdvance } from "react-icons/fc";
import { AiFillFacebook, AiFillInstagram, AiOutlineLinkedin } from "react-icons/ai";
import { SocialIcon } from 'react-social-icons';

export default function Home() {

    return (
        <div className={"home__container  "}>

            <div className="home__header ">
                <h1  >VConventer   </h1>
            </div>
            {/* <div id="sidebar">Sidebar</div> */}
            <div className="home__about">
                <h1> Vconventer is online video converter</h1>
                <p>
                    VConventer is an online tool to download,
                    My online video converter is very simple and easy to use.
                    It's allows you to convert and download video from YouTube, Facebook and Instgram
                    for free - this service works for computer and mobile devices.
                 </p>
                <p>
                    The videos are always converted in the highest available quality.
                    Please note that we can only convert videos up to a length of 1.5 hour -
                    the limitation is necessary, so the conversion of any video will not take more than
                    a couple of secunds.
                </p>
            </div>

            <div className="home__appUse">
                {/* BsArrowRightShort */}
                <h2>How to use our YouTube Converter</h2>

                <p>Instagram video downloader work in 3 easy steps:</p>





                <FcAdvance size={32} />
                 Copy a Video link  you want to convert.. Then go to ytconvert.herokuapp.com

                <br></br><br></br>
                <FcAdvance size={32} />
                Visting ytconvert.herokuapp.com and to the current page and paste link. Choose the format and then Click Convert  button to start converting process. It can takes a few seconds to minutes.
                   <br></br><br></br>
                <FcAdvance size={32} /> Click Download button to get mp3/ mp4 file
                This is the last step! All you have to do now is to click convert and wait just a little bit for your file to get converted.
            </div>
            
            <footer >
                <p><small>&copy; 2020 - Marshood Ayoub </small>
                    <SocialIcon url="https://www.linkedin.com/in/marshoodayoub/" style={{ height: 25, width: 25 }} />
                    <SocialIcon url="https://github.com/Marshood" style={{ height: 25, width: 25 }} />
                    <SocialIcon url="https://www.facebook.com/marshoodayoub" style={{ height: 25, width: 25 }} />
                    <SocialIcon url="https://www.instagram.com/marshood1/" style={{ height: 25, width: 25 }} />
                    <SocialIcon url="https://www.youtube.com/user/marshood94" style={{ height: 25, width: 25 }} />

                </p>
            </footer>
        </div >

    )





}