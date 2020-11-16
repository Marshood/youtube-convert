import React from 'react';
import './nav.css';
import logo from "../../img/file.svg" //ConvertIcon.png"
import InstgramLogo from "../../img/instagram.svg" //instgram.png"
import YoutubeLogo from "../../img/youtube.svg"
import FacebookLogo from "../../img/facebook.svg"
import HomeLogo from "../../img/home.svg"
import ContactLogo from '../../img/contact.svg'
import {
    BrowserRouter as Router,
    Link,
    useLocation

} from "react-router-dom";

//icons

export default props => {

    let location = useLocation().pathname;


    return (
        <div className="navBody">
            <nav className="sidebar">
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"></link>
                <div className="sidebar__header-wrapper2 ">
                    <img className="Yconvert__logo  " src={logo} alt="this is a logo" />
                 VConverter
               </div>

                <div className="menu__wrapper-2">
                    <div className={location === "/" ? 'menu__item--selected' : ""}>
                        <div className={location === "/home" ? 'menu__item--selected' : "menu__item"}>
                            <Link className={location === "/home" ? 'menu__link menu__link--selected ' : "menu__link"} to="/home"><img className="register__logo" src={HomeLogo} alt="this is a logo" />Home</Link>
                        </div>
                    </div>

                    <div className={location === "/YoutubeConvertPage" ? 'menu__item--selected' : "menu__item"}>
                        <Link className={location === "/YoutubeConvertPage" ? 'menu__link menu__link--selected' : "menu__link"} to="/YoutubeConvertPage"><img className="register__logo" src={YoutubeLogo} alt="this is a logo" />Youtube</Link>
                    </div>
                    <div className={location === "/InstgramConvertPage" ? 'menu__item--selected' : "menu__item"}>
                        <Link className={location === "/InstgramConvertPage" ? 'menu__link menu__link--selected' : "menu__link"} to="/InstgramConvertPage"><img className="register__logo" src={InstgramLogo} alt="this is a logo" />Instgram</Link>
                    </div>
                    <div className={location === "/FacebookConvertPage" ? 'menu__item--selected' : "menu__item"}>
                        <Link className={location === "/FacebookConvertPage" ? 'menu__link menu__link--selected' : "menu__link"} to="/FacebookConvertPage"><img className="register__logo" src={FacebookLogo} alt="this is a logo" />Facebook</Link>
                    </div>
                    <div className={location === "/contact_us" ? ' menu__item--selected---contactUs' : "menu__item"}>
                        <Link className={location === "/contact_us" ? 'menu__link--contactUs menu__link--selected---Contack_Us' : "menu__link Contack_Us"} to="/contact_us"><img className="register__logo" src={ContactLogo} alt="this is a logo" />Contack Us</Link>
                    </div>
                </div>

                <div className="sidebar__footer">
                    Converter App
        </div>
            </nav>
        </div>
    )

}