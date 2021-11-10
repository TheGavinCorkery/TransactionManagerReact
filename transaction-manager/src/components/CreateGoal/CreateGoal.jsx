import axios from 'axios'
import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const CreateGoal = (props) => {

    const [goalInfo, setInfo] = useState({"goalAmount": null, "category": null, "ledger": props.ledger.id})
    const [user, setUser] = useState(null)

    const jwt = localStorage.getItem('token')
    const authHeader = {headers: {'Authorization': 'Bearer ' + jwt}}

    const handleChange = (event) => {
        setInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createGoal()
        props.handleShow();
    }

    const createGoal = async() => {
        try {
            let response = axios.post('http://127.0.0.1:8000/api/goals/', goalInfo, authHeader)
            console.log(response.data)
        } catch (error) {
            console.log("🚀 ~ file: CreateGoal.jsx ~ line 24 ~ createGoal ~ error", error)   
        }
    }

    return ( 
        <Form onSubmit = {handleSubmit}>
            <Row>
                <Col align = "center">
                    <Form.Group>
                        <Form.Label>Goal Amount</Form.Label>
                        <Form.Control className = "form_box" value = {goalInfo.goalAmount} type = "text" name = "goalAmount"
                         placeholder = "How much would you like to spend" onChange = {handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col align = "center">
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control className = "form_box" value = {goalInfo.category} type = "text" name = "category"
                        placeholder = "What category is this goal for?" onChange = {handleChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col align = "center">
                    <Button type = "submit" id = "def_btn" variant = "danger" className = "create-goal">Create Goal</Button>
                </Col>
            </Row>
        </Form>
     );
}
 
export default CreateGoal;