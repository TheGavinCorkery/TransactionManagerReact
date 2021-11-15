import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import { Pie } from 'react-chartjs-2'
import { Offcanvas, Button, Tabs, Tab, Col } from 'react-bootstrap'
import CreateGoal from '../CreateGoal/CreateGoal'
import ViewGoal from '../ViewGoal/ViewGoal'

const AccountOverview = (props) => {

    const [dataReady, setData] = useState(false)
    const [categories, setCategories] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [showCanvas, setCanvas] = useState(false)
    const [key, setKey] = useState("create")

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
        getCategories()
    }, [])
    
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

    const handleShow = () => {
        setCanvas(!showCanvas)
    }

    return ( 
        dataReady ?
        (<div className="container">
                <Button className = "goal-btn" variant="danger" id = "def_btn" onClick = {handleShow}><i class="fa fa-bars"></i></Button>
            <div className="row">
                    <h2>Account Overview for {props.ledger.ledgerName}</h2>
                <div className="col-md-8" id = "def_background" align = "center">
                    <RecentTransactions url = {'http://127.0.0.1:8000/api/transactions/ledger/all/'} ledger = {props.ledger.id} setClickedTrans = {props.setClickedTrans} toggleModal = {props.toggleModal}/>
                </div>
                <div className="col-md-4">
                    <Pie
                    height = {'30%'}
                    width = {'30%'}
                    data = {chartData}
                    />
                </div>
                <Offcanvas show = {showCanvas} onHide = {handleShow} id = "goal-offcanvas">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id = "goal-offcanvas">Goals for {props.ledger.ledgerName}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Tabs id = "goal-tab-container" activeKey = {key} onSelect = {(k) => setKey(k)}>
                            <Tab eventKey = "create" title = "Create">
                                <CreateGoal ledger = {props.ledger} handleShow = {handleShow}/>
                            </Tab>
                            <Tab eventKey = "view" title = "View">
                                <ViewGoal ledger = {props.ledger} />
                            </Tab>
                        </Tabs>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>)
        : (null)
     );
}
 
export default AccountOverview;