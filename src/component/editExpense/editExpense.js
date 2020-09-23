import React, { Component } from 'react';
import { Button, Col, Form, Jumbotron } from 'react-bootstrap';
// import "./EditExpense.css";
import { GlobalContext } from "../../dataManager/globalState";


class EditExpense extends Component
{
    constructor(props)
    {
        super();

        // console.log(GlobalContext)
        let target = GlobalContext._currentValue.expenseList.find(expense => expense.id === props.targetID);

        if(target == null)
        {
            target =
            {
                id: -1,
                name: "",
                amount: 0,
                category: ""
            }
        }

        this.state =
        {
            target: target,
            errorMessageName: "",
            errorMessageCatigoty: "",
            goodItem: false
        }
    }

    // shouldComponentUpdate(nextProps, nextState) 
    // {
    //     console.log("will update");
    //     console.log(nextProps)
    //     if(this.props.targetID !== nextProps.targetID)
    //     {
    //         let target = GlobalContext._currentValue.expenseList.find(expense => expense.id === nextProps.targetID);

    //         let itemCheck = target.name !== "";
    //         if(target == null)
    //         {
    //             target =
    //             {
    //                 id: -1,
    //                 name: "",
    //                 amount: 0,
    //                 category: ""
    //             }
    //         }

    //         this.setState({
    //             target: target,
    //             errorMessage: "",
    //             goodItem: itemCheck
    //         })
    //     }
    //     return true;
    // }

    componentDidUpdate(prevProps)
    {
        if(this.props.targetID !== prevProps.targetID)
        {
            let target = this.context.expenseList.find(expense => expense.id === this.props.targetID);

            if(target == null)
            {
                target =
                {
                    id: -1,
                    name: "",
                    amount: 0,
                    category: ""
                }
            }
            let itemCheck = target.name !== "";

            this.setState({
                target: target,
                errorMessage: "",
                goodItem: itemCheck
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
            tempTarget.amount = parseInt(event.target.value, 10);
        }
        

        this.setState (
            {
                target: tempTarget,
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

        //Add
        if(this.state.target.id < 0)
        {
            let maxId = 0;
            for(let index = 0; index < GlobalContext._currentValue.expenseList.length; index ++)
            {
                if(maxId < this.context.expenseList[index].id)
                {
                    maxId =  this.context.expenseList[index].id
                }
            }
            maxId ++;

            let newExprense = {...this.state}

            newExprense.target.id = maxId;
            
            this.context.addExpense(newExprense.target);
        }
        //Edit
        else
        {
            this.context.editExpense(this.state.target);
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
            <Jumbotron>
                <h4>{this.state.target.id < 0 ? "Add Expense" : "Edit Expense"}</h4>
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

                    <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="Number" placeholder="Amount" value={this.state.target.amount} onChange={this.changeNumber}/>
                    <Form.Control.Feedback type="invalid">{this.state.messageEmail}</Form.Control.Feedback>
                    </Form.Group>

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






