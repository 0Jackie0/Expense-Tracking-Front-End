import React, { Component } from 'react';
import { Button, Col, Form, Jumbotron } from 'react-bootstrap';
import "./editExpense.css";
import { GlobalContext } from "../../../dataManager/globalState";


class EditExpense extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            target: {
                id: -1,
                name: "",
                amount: 0,
                category: ""
            },
            isExpense: true,
            errorMessageName: "",
            errorMessageCatigoty: "",
            goodItem: false
        }
    }

    componentDidMount()
    {
        let target = {...this.context.expenseList.find(expense => expense.id === this.props.targetID)};

        if(target.id == null)
        {
            target =
            {
                id: -1,
                name: "",
                amount: 0,
                category: ""
            }
        }

        let isisExpense = target.amount <= 0 ? true : false;
        target.amount = Math.abs(target.amount);

        this.setState({
            target: target,
            errorMessageName: "",
            errorMessageCatigoty: "",
            isExpense: isisExpense,
            goodItem: target.name !== ""
        })
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.targetID !== prevProps.targetID)
        {
            let target = {...this.context.expenseList.find(expense => expense.id === this.props.targetID)};

            if(target.id == null)
            {
                target =
                {
                    id: -1,
                    name: "",
                    amount: 0,
                    category: ""
                }
            }

            let isisExpense = target.amount <= 0 ? true : false;
            target.amount = Math.abs(target.amount);

            this.setState({
                target: target,
                errorMessageName: "",
                errorMessageCatigoty: "",
                isExpense: isisExpense,
                goodItem: target.name !== ""
            })
        }
    }

    changeName = (event) =>
    {
        let tempTarget = this.state.target;
        let message = ""

        tempTarget.name = event.target.value

        if(event.target.value === "")
        {
            message = "Expense name cannot be empty"
        }
        this.setState (
            {
                target: tempTarget,
                errorMessageName: message,
                goodItem: message === "" && tempTarget.category !== "" ? true : false
            }
        )
    }
    changeCatigory = (event) =>
    {
        let tempTarget = this.state.target;
        let message = ""

        tempTarget.category = event.target.value

        if(event.target.value === "")
        {
            message = "Catigory cannot be empty"
        }
        this.setState (
            {
                target: tempTarget,
                errorMessageCatigoty: message,
                goodItem: message === "" && tempTarget.name !== "" ? true : false
            }
        )
    }
    changeNumber = (event) =>
    {
        let tempTarget = this.state.target;

        if(event.target.value === "")
        {
            tempTarget.amount = 0;
        }
        else
        {
            tempTarget.amount = Math.abs(parseFloat(event.target.value));
        }

        console.log(tempTarget.amount);
        

        this.setState (
            {
                target: tempTarget,
            }
        )
    }
    changeType = (event) =>
    {
        this.setState (
            {
                isExpense: event.target.value === "true" ? true : false,
            }
        )
    }
    


    saveFunction = (event) =>
    {
        event.preventDefault();

        if(this.state.goodItem === false)
        {
            if(this.state.target.name === "")
            {
                this.setState (
                    {
                        errorMessageName: "Expense name cannot be empty",
                    }
                )
            }
            else
            {
                this.setState (
                    {
                        errorMessageCatigoty: "Catigory cannot be empty",
                    }
                )
            }
            return null;
        }

        var packageTarget = this.state.target;

        if(this.state.isExpense)
        {
            packageTarget.amount = Math.abs(packageTarget.amount) * -1
        }

        //Add
        if(this.state.target.id < 0)
        {
            let maxId = 0;
            for(let index = 0; index < this.context.expenseList.length; index ++)
            {
                if(maxId < this.context.expenseList[index].id)
                {
                    maxId =  this.context.expenseList[index].id
                }
            }
            maxId ++;

            packageTarget.id = maxId;
            
            this.context.addExpense(packageTarget);
        }
        //Edit
        else
        {
            this.context.editExpense(packageTarget);
        }
        this.cleanUp();
    }
    deleteFunction = (event) =>
    {
        event.preventDefault();

        this.context.deleteExpense(this.state.target.id);
        this.cleanUp();
    }
    cleanUp = () =>
    {
        this.setState(
            {
                target: 
                {
                    id: -1,
                    name: "",
                    amount: 0,
                    category: ""
                },
                isExpense: true,
                errorMessageName: "",
                errorMessageCatigoty: "",
                goodItem: false
            }
        )

        this.props.closeOverlay();
    }

    render()
    {
        return (
            <Jumbotron className="editAreaMaxHeight">
                <h4>{this.state.target.id < 0 ? "Add " : "Edit "}{this.state.isExpense === true ? "Expense" : "Income"}</h4>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Expense Name</Form.Label>
                                <Form.Control type="text" isInvalid={this.state.errorMessageName === "" ? false : true} placeholder="Expense Name" value={this.state.target.name} onChange={this.changeName}/>
                                <Form.Control.Feedback type="invalid">{this.state.errorMessageName}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Catigory</Form.Label>
                                <Form.Control type="text" isInvalid={this.state.errorMessageCatigoty === "" ? false : true} placeholder="Catigory" value={this.state.target.category} onChange={this.changeCatigory}/>
                                <Form.Control.Feedback type="invalid">{this.state.errorMessageCatigoty}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="Number" placeholder="Amount" value={this.state.target.amount} min={0} onChange={this.changeNumber}/>
                                <Form.Control.Feedback type="invalid">{this.state.messageEmail}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Expense/Income</Form.Label>
                                <Form.Control as="select" value={this.state.isExpense} onChange={this.changeType}>
                                    <option value={true}>Expense</option>
                                    <option value={false}>Income</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col className="d-inline-flex justify-content-center">
                            <Button variant="secondary" onClick={(event) => {event.preventDefault(); this.cleanUp();}}>
                                Cancel
                            </Button>
                        </Col>

                        {this.state.target.id > 0 ? 
                            <Col className="d-inline-flex justify-content-center">
                                <Button variant="danger" onClick={this.deleteFunction}>
                                    Delete
                                </Button>
                            </Col> 
                            : 
                            null
                        }

                        <Col className="d-inline-flex justify-content-center"> 
                            <Button variant="success" onClick={this.saveFunction}>
                                Save
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Jumbotron>
        )
    }
}
EditExpense.contextType = GlobalContext;

export default EditExpense;






