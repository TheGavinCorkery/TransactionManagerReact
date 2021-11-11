import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import LedgerSideBar from '../LedgerSidebar/LedgerSidebar'
import NewLedger from '../NewLedger/NewLedger'
import UpdateTransModal from '../UpdateTransModal/UpdateTransModal'
import QuickAdd from '../QuickAdd/QuickAdd'

const LoggedHome = (props) => {

    const [userCategories, setUserCategories] = useState(null)
    const [dataReady, setReady] = useState(false)
    const [transactions, setTransactions] = useState(null)
    const [clickedTrans, setClickedTrans] = useState(null)
    const [showUpdateModal, setUpdateModal] = useState(false)

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserTransactions()
          getUserSidebar()
        }
        return function cleanup(){
          setReady(false)
        }
      }, [])

      const createLedger = async(ledgerValues) => {
        try{
          await axios.post('http://127.0.0.1:8000/api/ledgers/', ledgerValues, authHeader )
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
        <div className="container-fluid topMargin">
        {showUpdateModal && <UpdateTransModal updateTrans = {updateTrans} clickedTrans = {clickedTrans} showModal = {showUpdateModal} toggleModal = {toggleUpdateModal} transaction = {clickedTrans}/>}
          {props.modalShow && <NewLedger newLedger = {createLedger} showModal = {props.modalShow} toggleModal = {props.toggleModal} />}
          <div className="row">
            <div className = "col-lg-8">
                <RecentTransactions url = {'http://127.0.0.1:8000/api/transactions/'} setClickedTrans = {setClickedTransaction} toggleModal = {toggleUpdateModal} />
            
            <div className="col-lg-8">
              <QuickAdd createTransaction = {newTransaction} />
            </div>
          
            </div>
            <div className="col-lg-4">
                <LedgerSideBar categories = {userCategories} auth = {authHeader} setCategory = {props.setCategory} setLedger = {props.setLedger} />
            </div>
            </div>
        </div>)
        :
        (null)
     );
}
 
export default LoggedHome;