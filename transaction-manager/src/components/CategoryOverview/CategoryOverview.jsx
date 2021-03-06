import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import { Pie } from 'react-chartjs-2'

const CategoryOverview = (props) => {

    const [data, setReady] = useState(false)
    const requestInfo = {'ledger': props.category.ledger_id, 'category': props.category.category}
    const [difference, setDiff] = useState(0)
    const [chartData, setChartData] = useState(null)
    const [haveGoal, setGoal] = useState(false)
    const [catGoal, setCatGoal] = useState(null)

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

    const getDifference = async() => {
        try {
            let response = await axios.get('http://127.0.0.1:8000/api/goals/category/', config)
            if (response.data.length > 0) {
                setDiff((response.data[0].goalAmount - props.category.total) / 100)
                setGoal(true)
                setCatGoal(response.data[0].goalAmount)
            }
            setReady(true)
        } catch (error) {
            console.log("🚀 ~ file: CategoryOverview.jsx ~ line 38 ~ getDifference ~ error", error)
        }
    }

    useEffect(() =>{
        getDifference()
    }, [])

    return ( 
        data ?

        (<div className = "container">
                <h3>Category overview for {requestInfo.category}</h3>
                <div className="row">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-6" id = "def_background" style = {{'minHeight': '500px'}}>
                        <RecentTransactions url = {'http://127.0.0.1:8000/api/transactions/category/all/'} ledger = {requestInfo.ledger} category = {requestInfo.category} setClickedTrans = {props.setClickedTrans} toggleModal = {props.toggleModal}/>
                    </div>
                    <div className="col-lg-4">
                        {haveGoal ? 
                        (<Pie
                            height = {'30%'}
                            width = {'30%'}
                            data = {{labels: ["Spent", "Difference"],
                            datasets: [{
                                label: "Difference in Goal",
                                data: [((props.category.total / catGoal) * 100).toFixed(2) , (100 - (props.category.total / catGoal) * 100).toFixed(2)],
                                backgroundColor: ['red', 'green']
                            }]}}
                        />) : 
                        <p>There are no goals set, you can set new goals on your account overview page. This will allow you to 
                            see how much you're spending in comparison to your goal
                        </p>
                        }
                    </div>
                </div>
        </div>)
        :
        (null)
     );
}
 
export default CategoryOverview;