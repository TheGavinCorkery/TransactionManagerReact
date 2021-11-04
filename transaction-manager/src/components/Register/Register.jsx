import React, { useState } from 'react'
import {Form, FormGroup, FormControl, Button, FormLabel, Row, Col} from 'react-bootstrap'

const Register = (props) => {

    const [registerValues, setRegister] = useState({"first_name": null, "last_name": null,"email": null,"username": null, "password": null})

    const handleChange = (event) => {
        setRegister(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.registerUser(registerValues)
    }

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 login_form" align = "center" id = "def_background">
                    <h1>Sign Up...</h1>
                    <hr />
                    <div id = "login_form">
                            <Form onSubmit = {handleSubmit}>
                                <Row>
                                    <Col>
                                        <FormGroup controlId = "registerFormFirstName">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl  className = "form_box" type = "text" name = "first_name" placeholder = "John" onChange = {handleChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup controlId = "registerFormLastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl  className = "form_box" type = "text" name = "last_name" placeholder = "Doe" onChange = {handleChange} />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <FormGroup controlId = "registerFormUsername">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl className = "form_box" type = "text" name = "username" placeholder = "johndoe123" onChange = {handleChange}/>
                                    </FormGroup>
                                    </Col>
                                    <Col>
                                    <FormGroup controlId = "registerFormPassword">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl  className = "form_box" type = "password" name = "password" placeholder = "Shhhh this is a secret" onChange = {handleChange} />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup controlId = "registerFormEmail">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl className = "form_box" type = "email" name = "email" placeholder = "johndoe123@example.com" onChange = {handleChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button type = "submit" variant="danger" id = "def_btn">Register</Button>
                            </Form>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
     );
}
 
export default Register;