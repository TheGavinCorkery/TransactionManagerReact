import axios from 'axios'
import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import LedgerSideBar from '../LedgerSidebar/LedgerSidebar'
import NewLedger from '../NewLedger/NewLedger'
import UpdateTransModal from '../UpdateTransModal/UpdateTransModal'

const LoggedHome = (props) => {

    const [userLedgers, setUserLedgers] = useState(null)
    const [userCategories, setUserCategories] = useState(null)
    const [user, setUser] = useState(null)
    const [dataReady, setReady] = useState(false)
    const [transactions, setTransactions] = useState(null)
    const [clickedTrans, setClickedTrans] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserInfo()
          getUserLedgers()
          getUserTransactions()
        }
      }, [])

      const createLedger = async(ledgerValues) => {
        debugger
        const jwt = localStorage.getItem('token')
        try{
          await axios.post('http://127.0.0.1:8000/api/ledgers/', ledgerValues, {headers: {'Authorization': 'Bearer ' + jwt}} )
          getUserLedgers();
        }catch(err){
          console.log("🚀 ~ file: LoggedHome.jsx ~ line 31 ~ createLedger ~ err", err)
        }
      }

      const getUserTransactions = async() => {
        const jwt = localStorage.getItem('token')
        try{
            let transactions = await axios.get('http://127.0.0.1:8000/api/transactions/', {headers: {'Authorization': 'Bearer ' + jwt}})
            setTransactions(transactions.data)
            setReady(true)
        }catch (err){
            console.log("🚀 ~ file: LoggedHome.jsx ~ line 39 ~ getUserTransactions ~ err", err)
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

    const getUserLedgers = async() => {
        try{
            const jwt = localStorage.getItem('token')
            let response = await axios.get('http://127.0.0.1:8000/api/ledgers/', {headers: {'Authorization': 'Bearer ' + jwt}})
            setUserLedgers(response.data)
        }catch(err) {
            console.log("🚀 ~ file: LoggedHome.jsx ~ line 13 ~ getUserLedgers ~ err", err)
        }
    }

    const setClickedTransaction = (trans) => {
      setClickedTrans(trans)
    }

    return (
        dataReady ?
        (<>
        {props.showModal && <UpdateTransModal clickedTrans = {clickedTrans} showModal = {props.showUpdateModal} toggleModal = {props.toggleUpdateModal} transaction = {clickedTrans}/>}
        <div className="container-fluid">
          {props.modalShow && <NewLedger newLedger = {createLedger} showModal = {props.modalShow} toggleModal = {props.toggleModal} />}
          <div className="row">
            <div className = "col-lg-8">
                <RecentTransactions transactions = {transactions} setClickedTrans = {setClickedTransaction} toggleModal = {props.toggleUpdateModal} />
            </div>
            <div className="col-lg-4">
                <LedgerSideBar ledgers = {userLedgers} transactions = {transactions}/>
            </div>
            </div>
        </div>
        </>)
        :
        (null)
     );
}
 
export default LoggedHome;