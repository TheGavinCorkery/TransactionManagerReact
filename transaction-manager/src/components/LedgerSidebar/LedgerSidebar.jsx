import React, { useEffect, useState } from 'react'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import Accordion from 'react-bootstrap/esm/Accordion'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'
import axios from 'axios'

const LedgerSideBar = (props) => {

    const [dataReady, setData] = useState(false)

    // TODO create method to get total for ledger

    const getLedgerTotals = async() => {
        try{
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/ledgers/totals', props.auth)
            console.log(response.data)
            debugger
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
            (<Accordion id = "def_background">
                {props.ledgers.map((ledger) =>{
                    return  <span>
                                <AccordionHeader>{ledger.name} | {ledger.total}</AccordionHeader>
                                <AccordionBody>        
                                {props.categories.map((transaction) =>{
                                    if (transaction.ledger_id == ledger.id){
                                        return <AccordionItem>{transaction.category}   | {transaction.total}</AccordionItem>
                                    }
                                })}
                                </AccordionBody>
                            </span>
                })}
            </Accordion>)
     : null
     );
}
 
export default LedgerSideBar;