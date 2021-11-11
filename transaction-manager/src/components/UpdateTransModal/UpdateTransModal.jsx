import React, { useState } from 'react'
import {Form, FormGroup, FormLabel, FormControl, Button, Modal, ModalBody, ModalTitle} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const UpdateTransModal = (props) => {

    const [transInfo, setTransInfo] = useState({
        "id": props.transaction.id,
        "date": props.transaction.date,
        "place": props.transaction.place,
        "total": props.transaction.total,
        "description": props.transaction.description,
        "category": props.transaction.category
    })

    const handleChange = (event) => {
        setTransInfo(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = () => {
        props.updateTrans(transInfo)
        props.toggleModal()
    }

    return ( 
        <Modal show = {props.showModal} onHide = {props.toggleModal}>
            <ModalHeader>
                <ModalTitle>Updating {props.transaction.place} transaction </ModalTitle>
                <Button variant="danger" id = "def_btn" onClick = {props.toggleModal} >Close</Button>
            </ModalHeader>
                <ModalBody>
                    <Form onSubmit = {handleSubmit}>
                        <FormGroup>
                            <FormLabel>Date</FormLabel>
                            <FormControl className = "form_box" type = "date" name = "date" placeholder = "2021-11-5" 
                            value = {transInfo.date} onChange = {handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Place</FormLabel>
                            <FormControl className = "form_box" type = "text" name = "place" placeholder = "Target" 
                            value = {transInfo.place} onChange = {handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Total</FormLabel>
                            <FormControl className = "form_box" type = "text" name = "total" placeholder = "9.99" 
                            value = {transInfo.total} onChange = {handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormControl className = "form_box" type = "text" name = "description" placeholder = "I bought this because..." 
                            value = {transInfo.description} onChange = {handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Category</FormLabel>
                            <FormControl className = "form_box" type = "text" name = "category" placeholder = "School/Bills/Medical" 
                            value = {transInfo.category} onChange = {handleChange}/>
                        </FormGroup>
                        <Button type = "submit" variant="danger" id = "def_btn">Update Transaction</Button>
                    </Form>
                </ModalBody>
        </Modal>
     );
}
 
export default UpdateTransModal;