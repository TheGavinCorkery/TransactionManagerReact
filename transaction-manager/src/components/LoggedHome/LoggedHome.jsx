import axios from 'axios'
import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import LedgerSideBar from '../LedgerSidebar/LedgerSidebar'
import NewLedger from '../NewLedger/NewLedger'
import UpdateTransModal from '../UpdateTransModal/UpdateTransModal'
import QuickAdd from '../QuickAdd/QuickAdd'

const LoggedHome = (props) => {

    const [userLedgers, setUserLedgers] = useState(null)
    const [userCategories, setUserCategories] = useState(null)
    const [user, setUser] = useState(null)
    const [dataReady, setReady] = useState(false)
    const [transactions, setTransactions] = useState(null)
    const [clickedTrans, setClickedTrans] = useState(null)
    const [showUpdateModal, setUpdateModal] = useState(false)

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserInfo()
          getUserLedgers()
          getUserTransactions()
          getUserSidebar()
        }
      }, [])

      const createLedger = async(ledgerValues) => {
        try{
          await axios.post('http://127.0.0.1:8000/api/ledgers/', ledgerValues, authHeader )
          getUserLedgers();
        }catch(err){
          console.log("🚀 ~ file: LoggedHome.jsx ~ line 28 ~ createLedger ~ err", err)
        }
      }

      const getUserTransactions = async() => {
        try{
            let transactions = await axios.get('http://127.0.0.1:8000/api/transactions/', authHeader)
            setTransactions(transactions.data)
        }catch (err){
            console.log("🚀 ~ file: LoggedHome.jsx ~ line 37 ~ getUserTransactions ~ err", err)
        }
    }

    const getUserInfo = () => {
      try{
        const userInfo = jwtDecode(jwt)
        setUser(userInfo)
      }catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 47 ~ getUserInfo ~ err", err)
      }
    }

    const getUserLedgers = async() => {
        try{
            let response = await axios.get('http://127.0.0.1:8000/api/ledgers/', authHeader)
            setUserLedgers(response.data)
        }catch(err) {
            console.log("🚀 ~ file: LoggedHome.jsx ~ line 56 ~ getUserLedgers ~ err", err)
        }
    }

    const updateTrans = async(transInfo) => {
      try {
        await axios.put('http://127.0.0.1:8000/api/transactions/transaction/edit', transInfo, authHeader)
        getUserTransactions()
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

    const getUserSidebar = async() => {
      try {
        let response = await axios.get('http://127.0.0.1:8000/api/transactions/ledgers/list', authHeader)
        setUserCategories(response.data);
        setReady(true)
      }catch (err){
        console.log("🚀 ~ file: LoggedHome.jsx ~ line 89 ~ getUserSidebar ~ err", err)
      }
    }

    const newTransaction = async(transInfo) => {
      try{
        await axios.post('http://127.0.0.1:8000/api/transactions/', transInfo ,authHeader)
      }catch (err) {
        console.log("🚀 ~ file: LoggedHome.jsx ~ line 99 ~ newTransaction ~ err", err)
      }
    }

    return (
        dataReady ?
        (
        <div className="container-fluid">
        {showUpdateModal && <UpdateTransModal updateTrans = {updateTrans} clickedTrans = {clickedTrans} showModal = {showUpdateModal} toggleModal = {toggleUpdateModal} transaction = {clickedTrans}/>}
          {props.modalShow && <NewLedger newLedger = {createLedger} showModal = {props.modalShow} toggleModal = {props.toggleModal} />}
          <div className="row">
            <div className = "col-lg-8">
                <RecentTransactions transactions = {transactions} setClickedTrans = {setClickedTransaction} toggleModal = {toggleUpdateModal} />
            
            <div className="col-lg-8">
              <QuickAdd createTransaction = {newTransaction} ledgers = {userLedgers}/>
            </div>
          
            </div>
            <div className="col-lg-4">
                <LedgerSideBar categories = {userCategories} auth = {authHeader} />
            </div>
            </div>
        </div>)
        :
        (null)
     );
}
 
export default LoggedHome;