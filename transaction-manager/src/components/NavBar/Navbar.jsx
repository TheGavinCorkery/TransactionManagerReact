import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import jwtDecode from 'jwt-decode'
import { useUser, UserContext } from '../../UserContext'

const Navbar = (props) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserInfo()
        }
        console.log(user)
      }, [])
    const getUserInfo = () => {
        const jwt = localStorage.getItem('token')
        try{
          const userInfo = jwtDecode(jwt)
          setUser(userInfo)
        }catch(err){
          console.log("🚀 ~ file: App.jsx ~ line 31 ~ getUserInfo ~ err", err)
        }
      }

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