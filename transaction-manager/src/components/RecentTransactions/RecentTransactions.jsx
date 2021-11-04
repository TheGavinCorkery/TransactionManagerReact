import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

const RecentTransactions = (props) => {

    const [transactions, setTransactions] = useState(null)
    const [dataReady, setReady] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserTransactions()
        }
      }, [])

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

    return (
        dataReady ? 
        (<Table striped border hover id = "def_background">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Place</th>
                    <th>Category</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => {
                    return  <tr key = {transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.place}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.total}</td>
                            </tr>
                })}
            </tbody>
        </Table>)
        : null
     );
}
 
export default RecentTransactions;