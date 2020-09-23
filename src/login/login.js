import React, { Component } from 'react';
import "./login.css"
import userIcon from "../static/userIcon.png"
import { Button, Form, Jumbotron, Image, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Login extends Component
{
    constructor()
    {
        super();

        this.state = {
            messageEmail: "",
            messagePassword: "",
            email: "",
            password: ""
        }

        this.navigationLink = React.createRef();

    }

    inputEmail = (event) =>
    {
        let message = ""
        if(event.target.value === "")
        {
            message = "Email Cannot be empty!";
        }

        this.setState(
            {
                email: event.target.value,
                messageEmail: message,
            }
        )
    }

    inputPassword = (event) =>
    {
        let message = ""
        if(event.target.value === "")
        {
            message = "Password Cannot be empty!";
        }

        this.setState(
            {
                password: event.target.value,
                messagePassword: message,
            }
        )
    }

    loginFunction = (event) =>
    {
        event.preventDefault();

        if(this.state.email !== "" && this.state.password !== "")
        {
            this.setState(
                {
                    messageEmail: "",
                    messagePassword: ""
                }
            )
            this.navigationLink.current.click();
        }
        else if (this.state.email === "")
        {
            this.setState(
                {
                    messageEmail: "Email Cannot be empty!"
                }
            )
        }
        else
        {
            this.setState(
                {
                    messagePassword: "Password Cannot be empty!"
                }
            )
        }
        
    }

    render()
    {
        return (
            <Jumbotron className="col-11 loginContainer d-flex justify-content-center">
                <Form>
                    <Col className="col-12">
                        <Image src={userIcon} roundedCircle />
                    </Col>
                    
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" isInvalid={this.state.messageEmail === "" ? false : true} placeholder="User Email" value={this.state.email} onChange={this.inputEmail}/>
                        <Form.Control.Feedback type="invalid">{this.state.messageEmail}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" isInvalid={this.state.messagePassword === "" ? false : true} placeholder="Password" value={this.state.password} onChange={this.inputPassword}/>
                        <Form.Control.Feedback type="invalid">{this.state.messagePassword}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.loginFunction}>Login</Button>
                    <Link ref={this.navigationLink} to="/main" style={{display: "none"}}/>
                </Form>
            </Jumbotron>
        )
    }
}
export default Login;





