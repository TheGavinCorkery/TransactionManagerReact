import './App.css';
import {Switch, Route} from 'react-router-dom';
import {useState} from 'react'
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

function App() {

  const [user, setUser] = useState(null)

  const loginURL = 'http://127.0.0.1:8000/api/auth/login/'

  const loginUser = async(loginInfo) => {
    try{
      let userInfo = await axios.post(loginURL, loginInfo)
      localStorage.setItem('token', userInfo.data.access)
      getUserInfo()
      console.log(user)
    } catch(err){
      console.log("🚀 ~ file: App.jsx ~ line 22 ~ loginUser ~ err", err)
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
      <Navbar user = {user}/>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser} />} />
      </Switch>
    </div>
  );
}

export default App;
