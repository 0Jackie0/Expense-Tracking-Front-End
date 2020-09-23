import React, { Component } from 'react';
import "./mainBody.css";
import ExpenseList from './overViewSubPage/expenseList/expenseList';
import Header from './header/header';
import OverView from "./overViewSubPage/overView/overView";
import EditExpense from "./overViewSubPage/editExpense/editExpense";
import ReportContent from "./reportSubPage/reportContent";

import { withRouter } from "react-router";

import { GlobalProvider } from "../dataManager/globalState";

class MainBody extends Component
{
    constructor()
    {
      super();
      
      this.state =
      {
        subPage: "OverView",
        editTargetId: -1,
      }
    }

    componentDidUpdate(prevProps)
    {
      if(prevProps.match.params.subPage !== this.props.match.params.subPage)
      {
        let subPage = this.props.match.params.subPage;
        this.setState(
          {
            subPage: subPage
          }
        );
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    overViewPageContent = () =>
    {
      return (
        <div>
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
        </div> 
      )
    }

    reportPageContent = () =>
    {
      return(
        <ReportContent/>
      )
    }

    render()
    {
      return (
        <div className="bodyArea">
          <div className="headerHeight">
            <Header/>
          </div>

          <GlobalProvider>

            {this.state.subPage === "OverView" ? 
              this.overViewPageContent()
              :
              null
            }

            {this.state.subPage === "Report" ?
              this.reportPageContent()
              :
              null
            }
            
          </GlobalProvider>
          
        </div>
      )
    }
}

export default withRouter(MainBody);






