import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

const RecentTransactions = (props) => {

    const [dataReady, setData] = useState(false)

    const handleClick = (trans) => {
        props.setClickedTrans(trans)
        props.toggleModal()
    }

    useEffect(() => {
        setData(true)
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
                {props.transactions.map((transaction) => {
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