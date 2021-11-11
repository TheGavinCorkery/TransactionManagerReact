import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import { Pie } from 'react-chartjs-2'

const CategoryOverview = (props) => {

    const [data, setReady] = useState(false)
    const [transactions, setTransactions] = useState(null)
    const [requestInfo, setInfo] = useState({'ledger': props.category.ledger_id, 'category': props.category.category})
    const [difference, setDiff] = useState(0)
    const [chartData, setChartData] = useState(null)

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {Authorization: 'Bearer ' + jwt}}

    const config = {
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        params: {
            ledger: requestInfo.ledger,
            category: requestInfo.category
        }
    }

    const getCategoryTransactions = async() => {
        try{
            let response = await axios.get('http://127.0.0.1:8000/api/transactions/category/all/', config)
            console.log("Transactions",response.data)
            setTransactions(response.data)
        }catch(err) {
            console.log("🚀 ~ file: CategoryOverview.jsx ~ line 11 ~ getCategoryTransactions ~ err", err)   
        }
    }

    const getDifference = async() => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/goals/category/', config)
            console.log("Difference: ", response.data[0])
            setDiff(response.data[0].goalAmount - props.category.total)
        } catch (error) {
            console.log("🚀 ~ file: CategoryOverview.jsx ~ line 38 ~ getDifference ~ error", error)
        }
    }
    const makeData = () => {
        setChartData({
            labels: ["Spent", "Difference"],
            datasets: [{
                label: "Difference in Goal",
                data: [props.category.total ,difference],
                backgroundColor: ['#FFB830', '#FF2442']
            }]
        })
        setReady(true)
    }

    useEffect(() =>{
        getCategoryTransactions()
        getDifference()
        makeData()
    }, [])

    return ( 
        data ?

        (<div className = "container">
                <h3>Category overview for {requestInfo.category}</h3>
                <div className="row">
                    <div className="col-lg-8">
                        <RecentTransactions transactions = {transactions} />
                    </div>
                    <div className="col-lg-4">
                        <Pie
                            height = {'30%'}
                            width = {'30%'}
                            data = {chartData}
                        />
                    </div>
                </div>
        </div>)
        :
        (null)
     );
}
 
export default CategoryOverview;