import React, { useEffect, useState } from 'react'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import Accordion from 'react-bootstrap/esm/Accordion'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'
import axios from 'axios'

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
        getLedgerTotals()
    }, [])

    return (
        dataReady ? 
            (<div id = "def_background"><Accordion id = "def_background">
                {userLedgers.map((ledger) =>{
                    return  <Accordion.Item>
                                <Accordion.Header>{ledger.ledger_name} | {ledger.total}</Accordion.Header>      
                                {props.categories.map((transaction) =>{
                                    if (transaction.ledger_id == ledger.ledger_id){
                                        return <Accordion.Body>{transaction.category}   | {transaction.total}</Accordion.Body>
                                    }
                                })}
                            </Accordion.Item>
                })}
            </Accordion></div>)
     : null
     );
}
 
export default LedgerSideBar;