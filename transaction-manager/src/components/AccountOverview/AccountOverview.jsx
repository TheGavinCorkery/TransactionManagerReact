import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import { Pie } from 'react-chartjs-2'

const AccountOverview = (props) => {

    const [transactions, setTransactions] = useState(null)
    const [dataReady, setData] = useState(false)
    const [categories, setCategories] = useState(null)
    const [chartData, setChartData] = useState(null)

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

    const config = {
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        params: {
            ledger: props.ledger.id
        }
    }

    useEffect(() => {
        getTransactions()
        getCategories()
    }, [])

    const getTransactions = async() => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/ledger/all/', config)
            setTransactions(response.data)
        } catch (error) {
            console.log("🚀 ~ file: AccountOverview.jsx ~ line 16 ~ getTransactions ~ error", error)
        }
    }
    
    const getCategories = async() => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/ledger/categories', config)
            setCategories(response.data)
            chart(response.data)
        } catch (error) {
            console.log("🚀 ~ file: AccountOverview.jsx ~ line 43 ~ getCategories ~ error", error)
        }
        setData(true);
    }

    const chart = (data) => {
        let category = []
        let totals = []
        for (const item of data){
            category.push(item.category)
            totals.push(item.total)
        }
        setChartData({
            labels: category,
            datasets: [{
                label: "Categories and Totals",
                data: totals,
                backgroundColor: ['#FFB830', '#FF2442', 'purple', 'green']
            }]
        })
    }

    return ( 
        dataReady ?
        (<div className="container">
            <div className="row">
                <div className="col-md-8" align = "center">
                    <h2>Account Overview for {props.ledger.ledgerName}</h2>
                    <RecentTransactions transactions = {transactions}/>
                </div>
                <div className="col-md-4">
                    <Pie
                    height = {'30%'}
                    width = {'30%'}
                    data = {chartData}
                    />
                </div>
            </div>
        </div>)
        : (null)
     );
}
 
export default AccountOverview;