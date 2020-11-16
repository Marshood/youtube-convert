import { React, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import './contact_us.css'
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

export default function ContactUsPage() {
    const history = useHistory();
    const [LoaderT, setLoader] = useState(false); // to show the loader icon

    function sendMessage(e) {
        e.preventDefault();
         setLoader(true)
        fetch('/api/contact/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: e.target.input_name.value,
                    email: e.target.input_email.value,
                    subject: e.target.input_subject.value,
                    message: e.target.message.value
                })
        })
            .then(response => response.json())
            .then(data => {
                 setTimeout(() => {  history.push("/home"); }, 2000);
             });
    }
    return (

        <div className="contactUs__container">
            <script data-ad-client="ca-pub-1844108616693955" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <div className="contactUs__header">
                <h1  >Contact Us </h1>
                
            </div>
            {/* <h2 className="contactUs__main">
                If you have any query or you found any type of bug in our website (SocialDown.com), You can contact us by filling the form given below.
            </h2> */}
           
            <main className="contactUs__mainO">

                <div className="contactUs__main">
                    <Loader   //Grid Oval TailSpin
                        type="TailSpin"
                        color="#00BFFF"
                        secondaryColor="Grey"
                        height={100}
                        width={100}
                        //  timeout={3000} //3 secs
                        visible={LoaderT} />
                        {
                            LoaderT&&
                            <h1>thanks for contacting us we will be in touch with you shortly.</h1>
                        }
                    {!LoaderT &&
                        <form className="contactUs__form__container" onSubmit={(e) => sendMessage(e)}>
                            <div className=" ">
                                <input type="text" id="input_name" placeholder="Name" required />
                                <input type="email" id="input_email" placeholder="Email address" required />
                                <input type="text" id="input_subject" placeholder="Subject" required />
                            </div>
                            <div className=" ">
                                <textarea className="textarea" name="message" type="text" id="input-message" placeholder="Message" required></textarea>
                            </div>
                            <div className=" ">
                                <button className="contactUs__button" id="input-submit" type="submit">Send  </button>
                            </div>
                        </form>
                    }


                </div>
            </main>







            <footer>
                <p><small>&copy; 2020 - Marshood Ayoub</small></p>
                <SocialIcon url="https://www.linkedin.com/in/marshoodayoub/" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://github.com/Marshood" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://www.facebook.com/marshoodayoub" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://www.instagram.com/marshood1/" style={{ height: 25, width: 25 }} />
                <SocialIcon url="https://www.youtube.com/user/marshood94" style={{ height: 25, width: 25 }} />
            </footer>
        </div>
    )


}