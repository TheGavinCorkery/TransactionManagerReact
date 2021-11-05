import React, {useState} from 'react'
import {Form, FormGroup, FormLabel, FormControl, Button, Modal, ModalBody, ModalTitle} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const NewLedger = (props) => {

    const [ledgerValues, setLedgerValues] = useState({"name": null, "total": 0})

    const handleChange = (event) => {
        setLedgerValues(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.newLedger(ledgerValues)
    }

    return ( 
        <Modal show ={props.showModal} onHide = {props.toggleModal} >
            <ModalHeader>
                <ModalTitle>Create New Ledger</ModalTitle>
                <Button variant="danger" id = "def_btn" onClick = {props.toggleModal} >Close</Button>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit = {handleSubmit}>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormControl className = "form_box" type = "text" name = "name" placeholder = "Bank Account/Card Name" onChange = {handleChange}/>
                    </FormGroup>
                    <Button type = "submit" variant="danger" id = "def_btn" >Create Ledger</Button>
                </Form>
            </ModalBody>
        </Modal>
     );
}
 
export default NewLedger;