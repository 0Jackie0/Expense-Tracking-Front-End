import React, { useContext } from 'react';
import "./expenseList.css"
import { Table } from 'react-bootstrap';

import { GlobalContext } from "../../dataManager/globalState";
import ExpenseContent from './expenseContent/expenseContent';

function ExpenseList(props) 
{
  const globalState = useContext(GlobalContext);

  const tableContent = () =>
  {
    return (
      <Table hover>
        <thead>
          <tr>
            <th>ExpenseName</th>
            <th>Catigory</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {globalState.expenseList.map(expense => <ExpenseContent editFunction={props.editFunction} key={expense.id} expense={expense}/>)}
        </tbody>
      </Table>
    );
  }

  return (
    <div>
      <div className="tableBodyScroll d-none d-sm-block">
      {tableContent()}
      </div>
      
      <div className="tableBodyScrollSmall d-block d-sm-none">
        {tableContent()}
      </div>
    </div>
    
  );
}

export default ExpenseList;
