import React from 'react'
import {Form, FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap'
import { useState } from 'react';

const Login = (props) => {

    const [loginValues, setLogin] = useState({"email": null, "password": null})

    const handleChange = (event) => {
        setLogin(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(loginValues)
    }

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 login_form" align = "center" id = "def_background">
                    <h1>Log In...</h1>
                    <hr />
                    <div id = "login_form">
                        <Form onSubmit = {handleSubmit}>
                            <FormGroup controlId = "loginFormEmail">
                                <FormLabel>Email Address</FormLabel>
                                <FormControl id = "form_box" type = "email" placeholder = "johndoe123@example.com" />
                            </FormGroup>
                            <FormGroup controlId = "loginFormPassword">
                                <FormLabel>Password</FormLabel>
                                <FormControl  id = "form_box" type = "password" placeholder = "Shhhh this is a secret" />
                            </FormGroup>
                            <Button type = "submit" variant="danger" id = "def_btn">Log In</Button>
                        </Form>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
     );
}
 
export default Login;