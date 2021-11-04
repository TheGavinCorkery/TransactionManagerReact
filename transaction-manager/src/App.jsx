import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
// import {  UserProvider, UserContext } from './UserContext'
import LoggedHome from './components/LoggedHome/LoggedHome';
import Register from './components/Register/Register';

function App() {

  const [user, setUser] = useState(null)
  const [dataReady, setReady] = useState(false)

  const loginURL = 'http://127.0.0.1:8000/api/auth/login/'
  const registerURL = 'http://127.0.0.1:8000/api/auth/register/'

  useEffect(() => {
    if (localStorage.getItem('token')){
      getUserInfo()
    }
  }, [])

  const registerUser = async(registerInfo) => {
    try{
      console.log(registerInfo)
      debugger
      await axios.post(registerURL, registerInfo)
      loginUser({'username': registerInfo.username, 'password': registerInfo.password})
    }catch (err){
      console.log("🚀 ~ file: App.jsx ~ line 32 ~ registerUser ~ err", err)
    }
  }

  const loginUser = async(loginInfo) => {
    try{
      let userInfo = await axios.post(loginURL, loginInfo)
      localStorage.setItem('token', userInfo.data.access)
      getUserInfo();
      window.location = '/home'
    } catch(err){
      console.log("🚀 ~ file: App.jsx ~ line 22 ~ loginUser ~ err", err)
    }
  }

  const logoutUser = async() => {
    try{
      localStorage.removeItem('token')
      setUser(null);
      window.location = "/"
    }catch(err){
      console.log("🚀 ~ file: App.jsx ~ line 36 ~ logoutUser ~ err", err)
    }
  }

  const getUserInfo = () => {
    const jwt = localStorage.getItem('token')
    try{
      const userInfo = jwtDecode(jwt)
      setUser(userInfo)
      setReady(true)
    }catch(err){
      console.log("🚀 ~ file: App.jsx ~ line 31 ~ getUserInfo ~ err", err)
    }
  }

  return (
    dataReady  ?
       (<div className="App">
        <Navbar logoutUser = {logoutUser}/>
        <Switch>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
          <Route path = "/register" render = {props => <Register />} />
          <Route path = "/LandingPage" render ={props => <LoggedHome user = {user} />}/>
          <Route 
          path= "/home"
          render = {props => {
            if(localStorage.getItem("token") == null){
              
              return <Redirect to = "/login" />
            } else {
              return <Redirect to = "/LandingPage" />
            }
          }}
           />
        </Switch>
    </div>)
    : 
    (<div className="App">
        <Navbar logoutUser = {logoutUser}/>
        <Switch>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
          <Route path = "/register" render = {props => <Register registerUser = {registerUser} />} />
          <Route path = "/LandingPage" render ={props => <LoggedHome {...props} user = {user} />}/>
          <Route 
          path= "/home"
          render = {props => {
            if(localStorage.getItem("token") == null){
              
              return <Redirect to = "/login" />
            } else {
              return <Redirect to = "/LandingPage" />
            }
          }}
           />
        </Switch>
    </div>)
   
  );
}

export default App;
