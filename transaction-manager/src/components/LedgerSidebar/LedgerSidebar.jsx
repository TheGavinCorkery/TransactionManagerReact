import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/esm/Accordion'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './LedgerSidebar.css'

const LedgerSideBar = (props) => {

    const [dataReady, setData] = useState(false)
    const [userLedgers, setLedgers] = useState(null)

    // TODO create method to get total for ledger

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
            (<div id = "def_background" className = "mx-spacing">
                <Accordion id = "def_background">
                    {userLedgers.map((ledger) =>{
                        return  <Accordion.Item key = {ledger.id}>
                                    <Accordion.Header key = {ledger.id}>{ledger.ledger_name} | {ledger.total}</Accordion.Header>      
                                    {props.categories.map((transaction) =>{
                                        if (transaction.ledger_id == ledger.ledger_id){
                                            return <Accordion.Body key = {transaction.id}><Link to = '/category_view' onClick = {() => props.setCategory(transaction.category, ledger.ledger_id)} ><p className = "catName">{transaction.category}   |    </p><p className = "catTotal">{transaction.total}</p></Link></Accordion.Body>
                                        }
                                    })}
                                </Accordion.Item>
                    })}
                </Accordion>
            </div>)
     : null
     );
}
 
export default LedgerSideBar;