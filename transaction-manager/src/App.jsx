import './App.css';
import { Route, Switch } from 'react-router';
import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {  UserProvider, UserContext } from './UserContext'

function App() {

  const [user, setUser] = useState(null)

  const loginURL = 'http://127.0.0.1:8000/api/auth/login/'

  useEffect(() => {
    if (localStorage.getItem('token')){
      getUserInfo()
    }
  }, [])

  const loginUser = async(loginInfo) => {
    try{
      let userInfo = await axios.post(loginURL, loginInfo)
      localStorage.setItem('token', userInfo.data.access)
    } catch(err){
      console.log("🚀 ~ file: App.jsx ~ line 22 ~ loginUser ~ err", err)
    }
  }

  const logoutUser = async() => {
    try{
      localStorage.removeItem('token')
      setUser(null);
    }catch(err){
      console.log("🚀 ~ file: App.jsx ~ line 36 ~ logoutUser ~ err", err)
    }
  }

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
    <div className="App">
      <UserContext.Provider value = {{user, setUser}}>
        <Navbar logoutUser = {logoutUser}/>
        <Switch>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
