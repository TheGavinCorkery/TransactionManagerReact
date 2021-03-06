import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/esm/Accordion'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './LedgerSidebar.css'

const LedgerSideBar = (props) => {

    const [dataReady, setData] = useState(false)
    const [userLedgers, setLedgers] = useState(null)

    const getLedgerTotals = async() => {
        try{
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/ledgers/totals', props.auth)
            setLedgers(response.data)
            setData(true)
        } catch (err) {
            console.log("🚀 ~ file: LedgerSidebar.jsx ~ line 16 ~ getLedgerTotals ~ err", err)
        }
    }

    useEffect(() => {
        setData(false)
        getLedgerTotals()
    }, [])

    return (
        dataReady ? 
            (<div id = "def_background" className = "topMargin">
                <Accordion defaultActiveKey = {0} flush>
                    {userLedgers.map((ledger) =>{
                        return  <Accordion.Item key = {ledger.id}>
                                    <Accordion.Header key = {ledger.id}><Link to = "/ledger_view" id = "sidebar-link" onClick = {() => props.setLedger(ledger.ledger_id, ledger.ledger_name)} key = {ledger.id}>{ledger.ledger_name} | {ledger.total.toFixed(2)}</Link></Accordion.Header>      
                                    {props.categories.map((transaction) =>{
                                        if (transaction.ledger_id == ledger.ledger_id){
                                            return <Accordion.Body key = {transaction.id}><Link to = '/category_view' onClick = {() => props.setCategory(transaction.category, ledger.ledger_id, transaction.total)} ><p className = "catName">{transaction.category}   |    </p><p className = "catTotal">{transaction.total.toFixed(2)}</p></Link></Accordion.Body>
                                        }
                                    })}
                                </Accordion.Item>
                    })}
                </Accordion>
            </div>)
     : <p>Add a ledger to get started</p>
     );
}
 
export default LedgerSideBar;