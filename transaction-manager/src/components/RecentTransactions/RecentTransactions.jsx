import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

const RecentTransactions = (props) => {

    const [dataReady, setData] = useState(false)
    const [transactions, setTrans] = useState(null)

    const handleClick = (trans) => {
        props.setClickedTrans(trans)
        props.toggleModal()
    }

    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {
            ledger: props.ledger,
            category: props.category
        }
    }

    const getTransactions = async() => {
        try {
            let response = await axios.get(props.url, config)
            setTrans(response.data)
            setData(true)
        } catch (error) {
            console.log("🚀 ~ file: RecentTransactions.jsx ~ line 19 ~ getTransactions ~ error", error)
        }
    }

    useEffect(() => {
        getTransactions()
      }, [])

    return (
        dataReady?
        (<Table striped border hover id = "def_background" className = "mx-spacing">
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
                    return  <tr key = {transaction.id} onClick = {() => handleClick(transaction)}>
                            <td>{transaction.date}</td>
                            <td>{transaction.place}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.total}</td>
                            </tr>
                })}
            </tbody>
        </Table>)
        :null
    )
}
 
export default RecentTransactions;