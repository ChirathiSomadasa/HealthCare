import React from 'react';
import './Home.css'
import WelcomeImage from '../../images/healthcard/home2.jpg';

function Home() {

    return (
        <div>
            <div className='parallax'>
                <div className="centered"><h1>Comprehensive Healthcare, Personalized for You</h1></div>
            </div>

            <div className='healthcare_body'>
                <div className='welcome_topic'> <h1>Welcome to HealthCare</h1></div>

                <div className='welcome'>

                    <div className='welcome_des'>
                        <p>Experience a new level of healthcare with HealthCare, your trusted partner in maintaining optimal health. 
                           Our innovative platform is designed to give you access to personalized healthcare solutions, 
                           helping you stay on top of your wellness journey.<br></br><br></br>

                           From remote patient monitoring to tailored health advice, HealthCare empowers you with tools to manage 
                           your health effectively and stay connected with healthcare providers. <br></br><br></br>

                           Track your vital signs, receive expert medical insights, and manage appointments all in one place. 
                           Our advanced health tracking and reminder systems ensure you never miss an important checkup or medication. 
                           Stay informed with real-time alerts and updates on your health conditions.<br></br><br></br>

                           Join our community of empowered patients and healthcare professionals, and take control of your health with HealthCare.
                           Together, we are building a healthier, smarter future.
                        </p>

                    </div>

                    <div className='welcome_photo'><img src={WelcomeImage} alt="welcome" /></div>
                </div>

                <div className="about-image">
                    <div className="about-text">
                        <h1>About Us</h1><br></br>

                        <p>HealthCare is a state-of-the-art healthcare platform dedicated to improving patient outcomes through innovation and technology. 
                           We integrate medical history, real-time health data, and location-based insights to help patients make informed decisions about 
                           their health and wellness.<br></br><br></br>

                           Our platform empowers users to track vital health metrics, access personalized healthcare recommendations, and connect 
                           with medical professionals in real time. With HealthCare, patients can easily monitor their conditions, receive tailored advice on medication and treatments, and schedule appointments with ease.<br></br><br></br>

                           Beyond basic care management, HealthCare also offers tools for tracking chronic conditions, reporting symptoms, and monitoring 
                           recovery progress. We alert both patients and healthcare providers when immediate intervention is necessary, ensuring quick action 
                           during critical moments.<br></br><br></br>

                           HealthCare is committed to promoting health literacy and providing the resources needed for a proactive approach to personal 
                           well-being. Join us and take the next step toward a healthier future with the support of cutting-edge healthcare technology.
                        </p>

                    </div>
                </div>
               
            </div>

        </div>
    );
}

export default Home;
