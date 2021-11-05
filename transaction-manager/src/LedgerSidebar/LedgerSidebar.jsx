import React from 'react'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import {Accordion} from 'react-bootstrap'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'

const LedgerSideBar = (props) => {
    return (
        <div id = "def_background">
            <Accordion>
                {props.ledgers.map((ledger) =>{
                    return  <AccordionItem>
                                <AccordionHeader>{ledger.name} | {ledger.total}</AccordionHeader>
                                <AccordionBody>{props.transactions.map((transaction) =>{
                                    if (transaction.ledger == ledger.id){
                                        return transaction.category
                                    }
                                })}</AccordionBody>
                            </AccordionItem>
                })}
            </Accordion>
        </div>
     );
}
 
export default LedgerSideBar;