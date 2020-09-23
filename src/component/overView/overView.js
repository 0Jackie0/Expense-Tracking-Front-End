import React, { useContext } from 'react';
import "./overView.css";
import { Accordion, Col, Jumbotron, Row, Button } from 'react-bootstrap';

import { GlobalContext } from "../../dataManager/globalState";

function OverView(props) 
{
    const globalState = useContext(GlobalContext);

    let totalRemain = 0;
    let totalCost = 0;
    let totalIncome = 0;

    for(let index = 0; index < globalState.expenseList.length; index ++)
    {
        totalRemain += globalState.expenseList[index].amount;

        if(globalState.expenseList[index].amount > 0)
        {
            totalIncome += globalState.expenseList[index].amount;
        }
        else
        {
            totalCost += Math.abs(globalState.expenseList[index].amount);
        }
    }

    const collapseContent = () =>
    {
        return (
            <Accordion>
                <Row noGutters>
                    <Col>
                        <Accordion.Toggle as={Button} variant="link" size="sm" style={{color: 'black'}} eventKey="0">
                            <span>Your Balance</span>
                            <h4>${totalRemain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h4>
                        </Accordion.Toggle>
                    </Col>

                    <Col className="d-inline-flex justify-content-center align-items-center">
                        <Button variant="outline-info" onClick={props.openOverlay}>Add Expense</Button>
                    </Col>
                </Row>
                <Accordion.Collapse eventKey="0">
                    <Jumbotron>
                        <Row>
                            <Col className="d-flex justify-content-center verticalDivider">
                                <h6>Income</h6>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <h6>Expense</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center verticalDivider">
                                <span className="text-success">${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <span className="text-danger">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </Col>
                        </Row>
                    </Jumbotron>
                </Accordion.Collapse>
            </Accordion>
        )
    }

    const nonCollapseContent = () =>
    {
        return (
            <div className="d-none d-sm-block">
                <span>Your Balance</span>
                <h4>${totalRemain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h4>

                <Jumbotron>
                    <Row>
                        <Col className="d-flex justify-content-center verticalDivider">
                            <h6>Income</h6>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <h6>Expense</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center verticalDivider">
                            <span className="text-success">${totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <span className="text-danger">${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        )
    }

    return (
        <div>
            <div className="d-block d-sm-none">
                {collapseContent()}
            </div>

            {nonCollapseContent()}
        </div>
    );
}

export default OverView;
