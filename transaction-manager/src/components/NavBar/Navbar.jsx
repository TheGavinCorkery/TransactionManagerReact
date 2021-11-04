import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import { useUser, UserContext } from '../../UserContext'

const Navbar = (props) => {

    const {user, setUser} = useContext(UserContext)

    return (
        <div className="row navbar">
            <div className="col-lg-8"></div>
            <div className="col-lg-4" align = "center">
                <ul>
                    <Link to = '/' className = "nav-item">
                            <li>Home</li>
                    </Link>
                    {user ? 
                    
                    <React.Fragment>
                        <a onClick = {props.logoutUser} className='nav-item'> Log Out</a>
                    </React.Fragment>
                    
                    :
                    <React.Fragment>
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