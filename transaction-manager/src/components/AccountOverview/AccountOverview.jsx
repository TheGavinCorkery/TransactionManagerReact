import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'

const AccountOverview = (props) => {

    const [transactions, setTransactions] = useState(null)
    const [dataReady, setData] = useState(false)

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

    const config = {
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        params: {
            ledger: props.ledger.id
        }
    }

    useEffect(() => {
        getTransactions()
        console.log(props.ledger)
    }, [])

    const getTransactions = async() => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/ledger/all/', config)
            setTransactions(response.data)
            setData(true);
        } catch (error) {
            console.log("🚀 ~ file: AccountOverview.jsx ~ line 16 ~ getTransactions ~ error", error)
        }
    }

    return ( 
        dataReady ?
        (<div className="container">
            <h2>Account Overview for {props.ledger.ledgerName}</h2>
            <RecentTransactions transactions = {transactions}/>
        </div>)
        : (null)
     );
}
 
export default AccountOverview;