import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'

const Navbar = (props) => {

  const [user, setUser] = useState(null)
  const [userLedgers, setUserLedgers] = useState([])
  const [dataReady, setReady] = useState(false)

  const jwt = localStorage.getItem('token')

  useEffect(() => {
      if (localStorage.getItem('token')){
        getUserInfo()
        getUserLedgers()
      }
    }, [])
  const getUserInfo = () => {
      try{
        const userInfo = jwtDecode(jwt)
        setUser(userInfo)
      }catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 31 ~ getUserInfo ~ err", err)
      }
    }
  
  const getUserLedgers = async() => {
    try {
      let response = await axios.get('http://127.0.0.1:8000/api/ledgers/', {headers: {Authorization: 'Bearer ' + jwt}})
      setUserLedgers(response.data)
      dataReady(true)
    } catch (error) {
      console.log("🚀 ~ file: Navbar.jsx ~ line 28 ~ getUserLedgers ~ error", error)
      
    }
  }
  return (
      <div className="row navbar">
          <div className="col-lg-8" align = "left" id = "logo">
            <h2>Transaction Tracker</h2>
          </div>
          <div className="col-lg-4" align = "right">
              <ul>
                  {user ? 
                  
                  <React.Fragment> 
                    <DropdownButton id = "batch-add-dropdown" className = "nav-item" title = "Batch Add" align = "end">
                        {userLedgers.map((ledger) => {
                          return <DropdownItem>{ledger.name}</DropdownItem>
                        })}
                      </DropdownButton>
                    <Link to = '/LandingPage' className = "nav-item">
                            <li>Home</li>
                      </Link>
                      <a onClick = {props.toggleLedgerModal} className='nav-item'>New Ledger</a>
                      <a onClick = {props.logoutUser} className='nav-item'> Log Out</a>
                  </React.Fragment>
                  
                  :
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