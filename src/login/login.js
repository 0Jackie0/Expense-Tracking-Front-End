import React, { Component } from 'react';
import "./login.css"
import websideIcon from "../static/logo192.png"
import expenseTrackerImage from "../static/Expense Tracker Image.png"
import s1 from "../static/s1.png";
import s2 from "../static/w2.png";
import userIcon from "../static/userIcon.png"
import { Button, Form, Jumbotron, Image, Col, Navbar, Carousel } from 'react-bootstrap';
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
        // https://www.thebudgetmom.com/how-to-create-a-visual-method-for-tracking-your-spending/
        return (
            <div className="loginPageWidth">
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>
                            <img alt="" src={websideIcon} width="30"  height="30" className="d-inline-block align-top"/>
                            {' '}
                            Expense Tracker
                        </Navbar.Brand>
                    </Navbar>
                </div>
                <Image className="backgroundImageStyle" src={expenseTrackerImage} rounded />
                <div className="imageCover"/>

                <div className="d-flex justify-content-between loginBody">
                    <Jumbotron className="col-12 col-md-4 loginContainer d-flex justify-content-center">
                        <Form>
                            <Col xm={12}>
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
                                <Button variant="link">Forget password?</Button>
                            </Form.Group>

                            <Button variant="outline-info">Register</Button>

                            <Button variant="primary" type="submit" onClick={this.loginFunction}>Login</Button>
                            <Link ref={this.navigationLink} to="/main/Overview" style={{display: "none"}}/>
                        </Form>
                    </Jumbotron>
                    <div className="d-none d-md-block col-md-6 slideShowArea">
                        <h1>Expense Tracker</h1>

                       {/* https://www.google.com/search?q=expense+tracker&sxsrf=ALeKk03LrjxHAMpTOefS4m1oR-7P8s551Q:1600888742323&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjyiL6m___rAhWtIDQIHVF8DG8Q_AUoAXoECA0QAw#imgrc=tBWGadbjhO5hcM */}
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={s1}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Too many Expense tracing app to choose?</h3>
                                    <p>We pervide the most concise design to help you manage your accounting.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={s2}
                                    alt="Second slide"
                                />

                                <Carousel.Caption>
                                    <h3 className="blackInfo">Not a fan of Excle?</h3>
                                    <p className="blackInfo">We pervide the most concise design to help you manage your accounting.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;





