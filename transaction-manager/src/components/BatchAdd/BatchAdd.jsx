import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import QuickAdd from '../QuickAdd/QuickAdd';
import {useSelector, useDispatch} from 'react-redux'
import { add } from '../../features/transactions/transactionSlice'

const BatchAdd = (props) => {

    const [dataReady, setReady] = useState(false)
    // Storing transactions in an array allows me to use a for each loop on my backend to save transactions
    const transactions = useSelector((state) => state.transactions)
    const dispatch = useDispatch()
    
    const addToList = (transaction) => {
        dispatch(add(transaction))
    }

    useEffect(() => {
        console.log(transactions)
    }, [])

    return ( 
        <div className="container">
            {console.log(transactions)}
            <div className="row">
                <div className="col-lg-6" id = "def_background">
                    <h2>Added Transactions</h2>
                    {transactions.map((transaction) => {
                        return <Card><Card.Body><Card.Text>Place: {transaction.place} Date: {transaction.date}
                        Total: {transaction.total} Category: {transaction.category}</Card.Text></Card.Body></Card>
                    })}
                </div>
                <div className="col-lg-6">
                    <QuickAdd createTransaction = {addToList}/>
                </div>
            </div>
        </div>
     );
}
 
export default BatchAdd;