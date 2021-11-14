import React, { useState } from 'react'

const BatchAdd = (props) => {

    const [dataReady, setReady] = useState(false)
    // Storing transactions in an array allows me to use a for each loop on my backend to save transactions
    const [transactions, setTransactions] = useState([])
    


    return ( 
        <div className="container">
            <div className="col-3">
                <h2>Batch add for {props.userLedger.name}</h2>
            </div>
        </div>
     );
}
 
export default BatchAdd;