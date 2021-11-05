import React from 'react'
import {Form, FormGroup, FormLabel, FormControl, Button, Modal, ModalBody, ModalTitle} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const UpdateTransModal = (props) => {
    return ( 
        <Modal>
            <ModalHeader show = {props.showModal} onHide = {props.toggleModal}>
                <ModalTitle>Updating {props.transaction.place} transaction </ModalTitle>
                <Button variant="danger" id = "def_btn" onClick = {props.toggleModal} >Close</Button>
            </ModalHeader>
        </Modal>
     );
}
 
export default UpdateTransModal;