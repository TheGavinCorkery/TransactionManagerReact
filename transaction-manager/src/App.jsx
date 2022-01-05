import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import Login from './components/Login/Login'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import LoggedHome from './components/LoggedHome/LoggedHome';
import Register from './components/Register/Register';
import CategoryOverview from './components/CategoryOverview/CategoryOverview';
import AccountOverview from './components/AccountOverview/AccountOverview';
import UpdateTransModal from './components/UpdateTransModal/UpdateTransModal';
import BatchAdd from './components/BatchAdd/BatchAdd';

function App() {

  const [user, setUser] = useState(null)
  const [dataReady, setReady] = useState(false)
  const [modalShow, setModal] = useState(false)
  const [categoryView, setCategory] = useState(null)
  const [clickedLedger, setClickedLedger] = useState(null)
  const [clickedTrans, setClickedTrans] = useState(null)
  const [showUpdateModal, setUpdateModal] = useState(false)
  // const [batchLedger, setBatchLedger] = useState(null)
  

  const loginURL = 'http://127.0.0.1:8000/api/auth/login/'
  const registerURL = 'http://127.0.0.1:8000/api/auth/register/'
  const jwt = localStorage.getItem('token')
  const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

  useEffect(() => {
    if (localStorage.getItem('token')){
      getUserInfo()
    }
  }, [])

  const toggleLedgerModal = () => {
    setModal(!modalShow);
  }

  const registerUser = async(registerInfo) => {
    try{
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

  const setCategoryView = (category, ledger, total) => {
    setCategory({'category': category, 'ledger_id': ledger, 'total': total})
  }

  const setLedger = (id, name) => {
    setClickedLedger({id: id, ledgerName: name})
  }

  const updateTrans = async(transInfo) => {
    try {
      await axios.put('http://127.0.0.1:8000/api/transactions/transaction/edit', transInfo, authHeader)
      getUserInfo()
      window.location = '/home'
    }catch (err) {
      console.log("🚀 ~ file: LoggedHome.jsx ~ line 65 ~ updateTrans ~ err", err) 
    }
  } 

  const toggleUpdateModal = () => {
    setUpdateModal(!showUpdateModal)
  }

  const setClickedTransaction = (trans) => {
    setClickedTrans(trans)
  }

  return (
    dataReady  ?
       (<div className="App">
        <Navbar logoutUser = {logoutUser} toggleLedgerModal = {toggleLedgerModal}/>
        {showUpdateModal && <UpdateTransModal updateTrans = {updateTrans} clickedTrans = {clickedTrans} showModal = {showUpdateModal} toggleModal = {toggleUpdateModal} transaction = {clickedTrans}/>}
        <Switch>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
          <Route path = "/register" render = {props => <Register {...props} registerUser = {registerUser} />} />

          <Route path = "/LandingPage" render ={props => <LoggedHome {...props} user = {user} 
           modalShow = {modalShow} toggleModal = {toggleLedgerModal} setCategory = {setCategoryView} setLedger = {setLedger}
           setClickedTrans = {setClickedTransaction} toggleUpdateModal = {toggleUpdateModal} />}/>

          <Route path = "/category_view" render = {props => <CategoryOverview {...props} category = {categoryView} setClickedTrans = {setClickedTransaction} toggleModal = {toggleUpdateModal} />} />
          <Route path = "/batch-add" render = {props => <BatchAdd {...props} />} />
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
           <Route path = "/ledger_view" render = {props => <AccountOverview {...props} ledger = {clickedLedger} setClickedTrans = {setClickedTransaction} toggleModal = {toggleUpdateModal}/>} />
        </Switch>
    </div>)
    : 
    (<div className="App">
        <Navbar logoutUser = {logoutUser}/>
        <Switch>
          <Route path = "/" exact render = {props => <Home {...props} />} />
          <Route path = "/login" render = {props => <Login {...props} loginUser = {loginUser}/>} />
          <Route path = "/register" render = {props => <Register {...props} registerUser = {registerUser} />} />
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
