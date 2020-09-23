import React from 'react';
import "./expenseContent.css"

function ExpenseContent(props) 
{
    let sign = "$"
    if(props.expense.amount > 0)
    {
        sign = "+$";
    }
    else if (props.expense.amount < 0)
    {
        sign = "-$";
    }

    return (

        <tr className={props.expense.amount > 0 ? "incomeBackground" : "costBackground"} onClick={() => {props.editFunction(props.expense.id)}}>
            <td>{props.expense.name}</td>
            <td>{props.expense.category}</td>
            <td>{sign + Math.abs(props.expense.amount)}</td>
        </tr>
        

    //   <div className="d-flex justify-content-between">
    //       <span className="col-4">
    //         {props.expense.name}
    //       </span>

    //       <span className="col-4">
    //         {props.expense.category}
    //       </span>

    //       <span className="col-4">
    //         {props.expense.amount > 0 ? "+$" + props.expense.amount : "-$" + Math.abs(props.expense.amount)}
    //       </span>
    //   </div>
    );
}

export default ExpenseContent;
