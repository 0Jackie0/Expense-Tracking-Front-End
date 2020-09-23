import React, { createContext, useReducer } from "react";
import AppReducer from "./appReducer"

// const tempData = 
//       [
//         {
//           id: 1,
//           name: "Saveway",
//           amount: -82.50,
//           category: "family cost"
//         },
//         {
//           id: 2,
//           name: "car wash",
//           amount: -5.2,
//           category: "car cost"
//         },
//         {
//           id: 3,
//           name: "COSCO",
//           amount: -245.65,
//           category: "family cost"
//         },
//         {
//           id: 4,
//           name: "PS4",
//           amount: -490,
//           category: "game"
//         },
//         {
//           id: 5,
//           name: "salary",
//           amount: 4800,
//           category: "income"
//         },
//         {
//           id: 6,
//           name: "car wash",
//           amount: -5.2,
//           category: "car cost"
//         },
//         {
//           id: 7,
//           name: "COSCO",
//           amount: -245.65,
//           category: "family cost"
//         },
//         {
//           id: 8,
//           name: "PS4",
//           amount: -490,
//           category: "game"
//         },
//         {
//           id: 9,
//           name: "salary",
//           amount: 4800,
//           category: "income"
//         },
//         {
//           id: 10,
//           name: "Saveway",
//           amount: -82.50,
//           category: "family cost"
//         },
//         {
//           id: 11,
//           name: "car wash",
//           amount: -5.2,
//           category: "car cost"
//         },
//         {
//           id: 12,
//           name: "COSCO",
//           amount: -245.65,
//           category: "family cost"
//         },
//         {
//           id: 13,
//           name: "PS4",
//           amount: -490,
//           category: "game"
//         },
//         {
//           id: 14,
//           name: "salary",
//           amount: 4800,
//           category: "income"
//         },
//         {
//           id: 15,
//           name: "car wash",
//           amount: -5.2,
//           category: "car cost"
//         },
//         {
//           id: 16,
//           name: "COSCO",
//           amount: -245.65,
//           category: "family cost"
//         },
//         {
//           id: 17,
//           name: "PS4",
//           amount: -490,
//           category: "game"
//         },
//         {
//           id: 18,
//           name: "salary",
//           amount: 4800,
//           category: "income"
//         },
//       ]

function getLocalStorage ()
{
  if(localStorage.getItem("Expense Data"))
  {
    return JSON.parse(localStorage.getItem("Expense Data"))
  }
  else
  {
    return [];
  }
  
}

const initialState = {
    expenseList: getLocalStorage(),
}

export const GlobalContext = createContext(initialState);

export const GlobalPervider = ({children}) =>
{
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const deleteExpense = (expenseId) =>
    {
      dispatch( {type: "delete", payload: expenseId} )
    }

    const addExpense = (newExpense) =>
    {
      dispatch( {type: "add", payload: newExpense} )
    }

    const editExpense = (targetExpense) =>
    {
      dispatch( {type: "edit", payload: targetExpense} )
    }

    const passdownObject =
    {
      deleteExpense,
      addExpense,
      editExpense,
      expenseList: state.expenseList,
    }

    return (
        <GlobalContext.Provider value={passdownObject}>
            {children}
        </GlobalContext.Provider>
    );
}