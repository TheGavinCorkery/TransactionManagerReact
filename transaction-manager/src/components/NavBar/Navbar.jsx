import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = (props) => {
    return (
        <div className="row navbar">
            <div className="col-lg-8"></div>
            <div className="col-lg-4" align = "center">
                <ul>
                    {props.user == null &&
                    <React.Fragment>
                        <Link to = '/' className = "nav-item">
                            <li>Home</li>
                        </Link>
                        <Link to = '/login' className = "nav-item">
                            <li>Log In</li>
                        </Link>
                        <Link to = '/register' className = "nav-item">
                            <li>Register</li>
                        </Link>
                    </React.Fragment>
                    }
                </ul>
            </div>
        </div>
     );
}
 
export default Navbar;