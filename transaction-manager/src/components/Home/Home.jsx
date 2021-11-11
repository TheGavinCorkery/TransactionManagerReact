import React from 'react'
import WelcomePhoto from '../Images/WelcomePhoto.jpeg'
import {Row, Col} from 'react-bootstrap'
import './Home.css'
import '../../App.css'

const Home = (props) => {
    return ( 
        <div className="container">
            <Row>
                <div className="col-lg-8" align = "left">
                    <img src= {WelcomePhoto} alt="Snowy mountains" className = "welcome_photo" align = "left"/>
                </div>
                <div className="col-lg-4"  id = "welcome_text" align = "left">
                    <h1>Welcome to Transaction Tracker</h1>
                    <h3>New here? <a href="/register" id = "home-link">Sign up</a></h3>
                    <h3>Already a tracker? <a href = "/login" id = "home-link">Log In!</a></h3>
                </div>
            </Row>
        </div>
     );
}
 
export default Home;