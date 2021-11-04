import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {  UserProvider, UserContext } from './UserContext'
import LoggedHome from './components/LoggedHome/LoggedHome';

function App() {

  const [user, setUser] = useState(null)
  const [dataReady, setReady] = useState(false)

  const loginURL = 'http://127.0.0.1:8000/api/auth/login/'

  useEffect(() => {
  
    if (localStorage.getItem('token')){
      getUserInfo()
    }
    console.log(user)
  }, [])

  const loginUser = async(loginInfo) => {
    try{
      let userInfo = await axios.post(loginURL, loginInfo)
      localStorage.setItem('token', userInfo.data.access)
      getUserInfo();
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
          <Route path = "/LandingPage" render ={props => <LoggedHome/>}/>
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
    </div>): <div className="App">
        <Navbar logoutUser = {logoutUser}/>
        <Switch>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
          <Route path = "/LandingPage" render ={props => <LoggedHome/>}/>
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
    </div>
   
  );
}

export default App;
