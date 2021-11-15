import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'
import { DataGrid } from '@mui/x-data-grid';

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

    const columns = [
        {field: 'date', headerName: "Date", width: 150},
        {field: 'place', headerName: "Place", width: 190},
        {field: 'category', headerName: "Category", width: 150},
        {field: 'total', headerName: "Total"}
    ]

    useEffect(() => {
        getTransactions()
      }, [])

    return (
        dataReady?
        (
            <DataGrid
                rows={transactions}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5,10,15]}
                onRowClick={(event) => {handleClick(event.row)}}
            />
        )
        :null
    )
}
 
export default RecentTransactions;