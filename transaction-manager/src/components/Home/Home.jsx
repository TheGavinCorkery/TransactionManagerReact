import React from 'react'
import WelcomePhoto from '../Images/WelcomePhoto.jpeg'
import './Home.css'
import '../../App.css'

const Home = (props) => {
    return ( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <img src= {WelcomePhoto} alt="Snowy mountains" className = "welcome_photo" align = "left"/>
                </div>
                <div className="col-md-4"  id = "welcome_text" align = "left">
                    <h1>Welcome to Transaction Tracker</h1>
                    <h3>New here? <a href="/register">Sign up</a></h3>
                    <h3>Already a tracker? <a href = "/login">Log In!</a></h3>
                </div>
            </div>
        </div>
     );
}
 
export default Home;