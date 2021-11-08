import React, { useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import FormSelect from 'react-bootstrap/FormSelect'
import  FloatingLabel  from 'react-bootstrap/FloatingLabel'

const QuickAdd = (props) => {

    const [transData, setTransData] = useState({
                                                'date': null,
                                                'place': null,
                                                'total': null,
                                                'description': null,
                                                'category': null,
                                                'ledger': null
                                            })

    const handleChange = (event) => {
        setTransData(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createTransaction(transData);
        setTransData(null);
    }

    return ( 
        <div id = "def_background" align = "center">
            <Form id = "quick_add_form" onSubmit = {handleSubmit}>
                <h3>New Transaction</h3>
                <hr />
                <Row className = "mb-3"> 

                    <FormGroup as = {Col}>
                        <FormLabel>Place</FormLabel>
                        <FormControl className = "form_box" type = "text" name = "place" placeholder = "Where did you spend money?" onChange = {handleChange}/>
                    </FormGroup>
                
                    <FormGroup as = {Col}>
                        <FormLabel>Total</FormLabel>
                        <FormControl className = "form_box" type = "text" name = "total" placeholder = "$..." onChange = {handleChange}/>
                    </FormGroup> 

                </Row>
                <Row>
                    
                    <FormGroup as = {Col}>
                        <FormLabel>Description</FormLabel>
                        <FormControl className = "form_box" type = "text" name = "description" placeholder = "What is this for?" onChange = {handleChange}/>
                    </FormGroup>
                
                    <FormGroup as = {Col}>
                        <FormLabel>Category</FormLabel>
                        <FormControl className = "form_box" type = "text" name = "category" placeholder = "Food/Entertainment/Transportation" onChange = {handleChange}/>
                    </FormGroup>
                    
                </Row>
                <Row>
                    
                    <FormGroup as = {Col}>
                        <FormLabel>Date</FormLabel>
                        <FormControl className = "form_box" type = "date" name = "date" onChange = {handleChange}/>
                    </FormGroup>
                    
                    <Form.Group as = {Col}>
                        <Form.Label>Ledger</Form.Label>
                        <Form.Control 
                            as = "select" 
                            name = "ledger"
                            onChange = {e => {
                                setTransData(prevstate => ({
                                    ...prevstate,
                                    [e.target.name] : e.target.value
                                }))
                            }}>
                            {props.ledgers.map((ledger) => {
                                return <option value= {ledger.id}>{ledger.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                
                </Row>
                <Row>
                    <Button type = "submit" variant="danger" id = "def_btn">Create Transaction</Button>
                </Row>
            </Form>
        </div>
     );
}
 
export default QuickAdd;