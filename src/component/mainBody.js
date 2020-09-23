import React, { Component } from 'react';
import "./mainBody.css";
import ExpenseList from './expenseList/expenseList';
import Header from './header/header';
import OverView from "./overView/overView";
import EditExpense from "./editExpense/editExpense"

import { GlobalPervider } from "../dataManager/globalState";

class MainBody extends Component
{
    constructor()
    {
      super();
      
      this.state =
      {
        editTargetId: -1,
      }
    }

    editFunction = (targetId) =>
    {
      this.setState(
        {
          editTargetId: targetId
        }
      );
    }

    openOverlay = () =>
    {
      this.setState(
        {
          editTargetId: -2,
        }
      )
    }
    closeOverlay = () =>
    {
      this.setState(
        {
          editTargetId: -1,
        }
      )
    }

    render()
    {
      return (
        <div className="bodyArea">
          <div className="headerHeight">
            <Header/>
          </div>

          <GlobalPervider>
            {this.state.editTargetId !== -1 ?
              <div className="col-12 d-block d-sm-none overlayEdit">
                <EditExpense targetID={this.state.editTargetId} closeOverlay={this.closeOverlay}/>
              </div>
              :
              null
            }

            <div className="d-blok d-sm-flex">
              <div className="col-12 col-sm-6">
                <div className="col-12 ">
                  <OverView openOverlay={this.openOverlay}/>
                </div>
                <div className="col-12 d-none d-sm-block">
                  <EditExpense targetID={this.state.editTargetId} closeOverlay={this.closeOverlay}/>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <h4>Expense History</h4>
                <hr/>
                <ExpenseList editFunction={this.editFunction}/>
              </div>
            </div>
          </GlobalPervider>
          
        </div>
      )
    }
}
export default MainBody;






