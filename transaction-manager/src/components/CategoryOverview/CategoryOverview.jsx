import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'

const CategoryOverview = (props) => {

    const [dataReady, setData] = useState(false)
    const [transactions, setTransactions] = useState(null)
    const [requestInfo, setInfo] = useState({'ledger': props.category.ledger_id, 'category': props.category.category})

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {Authorization: 'Bearer ' + jwt}}

    const getCategoryTransactions = async() => {
        try{

            const config = {
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                params: {
                    ledger: requestInfo.ledger,
                    category: requestInfo.category
                }
            }
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/category/all/', config)

            setTransactions(response.data)
            setData(true)
        }catch(err) {
            console.log("🚀 ~ file: CategoryOverview.jsx ~ line 11 ~ getCategoryTransactions ~ err", err)   
        }
    }

    useEffect(() =>{
        getCategoryTransactions()
    }, [])

    return ( 
        dataReady ?

        (<div className = "container">
            <h3>Category overview for {requestInfo.category}</h3>
            <RecentTransactions transactions = {transactions} />
        </div>)
        :
        (null)
     );
}
 
export default CategoryOverview;