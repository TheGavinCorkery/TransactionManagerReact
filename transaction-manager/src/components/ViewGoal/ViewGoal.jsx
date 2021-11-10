import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from 'react-bootstrap';

const ViewGoal = (props) => {

    const [dataReady, setData] = useState(false)
    const [goals, setGoals] = useState(null);
    const jwt = localStorage.getItem('token')

    useEffect(() => {
        getGoals()
      }, [])

    const config = {
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
        params: {
            ledger: props.ledger.id
        }
    }

    const getGoals = async() => {
        try {
            debugger
            let response = await axios.get('http://127.0.0.1:8000/api/goals/', config)
            setGoals(response.data)
            setData(true)
        } catch (error) {
            console.log("🚀 ~ file: ViewGoal.jsx ~ line 15 ~ getGoals ~ error", error)     
        }
    }

    return (
        dataReady ?
        (<div>
            {goals.map((goal)=> {
                return  <Card>
                            <Card.Body>
                                <Card.Title>{goal.category}</Card.Title>
                                <Card.Text>{goal.goalAmount}</Card.Text>
                            </Card.Body>
                        </Card>
            })}
        </div>)
        : null
     );
}
 
export default ViewGoal;