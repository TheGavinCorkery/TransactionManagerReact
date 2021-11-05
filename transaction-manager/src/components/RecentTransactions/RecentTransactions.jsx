import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'

const RecentTransactions = (props) => {

    const handleClick = (trans) => {
        props.setClickedTrans(trans)
        props.toggleModal()
    }

    return (
        <Table striped border hover id = "def_background">
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
}
 
export default RecentTransactions;