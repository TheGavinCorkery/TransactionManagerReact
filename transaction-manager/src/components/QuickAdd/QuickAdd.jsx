import React, { useState, useEffect } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap'
import FormSelect from 'react-bootstrap/FormSelect'
import  FloatingLabel  from 'react-bootstrap/FloatingLabel'
import './QuickAdd.css'

const QuickAdd = (props) => {

    const [dataReady, setData] = useState(false)
    const [transData, setTransData] = useState({
                                                'date': '',
                                                'place': '',
                                                'total': '',
                                                'description': '',
                                                'category': '',
                                                'ledger': '',
                                            })

    const handleChange = (event) => {
        console.log(event.target.value)
        setTransData(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        props.createTransaction(transData);
        setTransData({'date': '', 'place': '', 'total': '', 'description': '', 'category': '', 'ledger': ''});
    }

    useEffect(() => {
        setTransData({'date': '', 'place': '', 'total': '', 'description': '', 'category': '', 'ledger': props.ledgers[0].id})
        setData(true)
      }, [])

    return ( 
        dataReady ?
        (<div id = "def_background" align = "center" className = "topMargin mx-spacing">
            <Form id = "quick_add_form" onSubmit = {handleSubmit}>
                <h3>New Transaction</h3>
                <hr />
                <Row className = "mb-3"> 

                    <FormGroup as = {Col}>
                        <FormLabel>Place</FormLabel>
                        <FormControl className = "form_box" value = {transData.place} type = "text" name = "place" placeholder = "Where did you spend money?" onChange = {handleChange}/>
                    </FormGroup>
                
                    <FormGroup as = {Col}>
                        <FormLabel>Total</FormLabel>
                        <FormControl className = "form_box" value = {transData.total} type = "text" name = "total" placeholder = "$..." onChange = {handleChange}/>
                    </FormGroup> 

                </Row>
                <Row>
                    
                    <FormGroup as = {Col}>
                        <FormLabel>Description</FormLabel>
                        <FormControl className = "form_box" type = "text"  value = {transData.description} name = "description" placeholder = "What is this for?" onChange = {handleChange}/>
                    </FormGroup>
                
                    <FormGroup as = {Col}>
                        <FormLabel>Category</FormLabel>
                        <FormControl className = "form_box" type = "text" value = {transData.category} name = "category" placeholder = "Food/Entertainment/Transportation" onChange = {handleChange}/>
                    </FormGroup>
                    
                </Row>
                <Row>
                    
                    <FormGroup as = {Col}>
                        <FormLabel>Date</FormLabel>
                        <FormControl className = "form_box" type = "date" value = {transData.date} name = "date" onChange = {handleChange}/>
                    </FormGroup>
                    
                    <Form.Group as = {Col}>
                        <Form.Label>Ledger</Form.Label>
                        <Form.Select 
                            className = "form_box"
                            name = "ledger"
                            onChange = {handleChange}>
                            {props.ledgers.map((ledger) => {
                                return <option value= {ledger.id} key = {ledger.id}>{ledger.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                
                </Row>
                <Row>
                    <Button type = "submit" variant="danger" id = "def_btn" className = "quick_add_button" >Create Transaction</Button>
                </Row>
            </Form>
        </div>)
        : null
     );
}
 
export default QuickAdd;