export default (state, action) =>
{
    switch(action.type)
    {
        case "delete":
            let removedState = {...state};
            removedState.expenseList = removedState.expenseList.filter(expense => expense.id !== action.payload)
            localStorage.setItem("Expense Data", JSON.stringify(removedState.expenseList));
            return removedState;
            
        case 'add':
            let newState = {...state};
            newState.expenseList.unshift(action.payload);
            localStorage.setItem("Expense Data", JSON.stringify(newState.expenseList));
            return newState;

        case 'edit':
            let editState = {...state};

            for(let index = 0; index < editState.expenseList.length; index ++)
            {
                if(editState.expenseList[index].id === action.payload.id)
                {
                    editState.expenseList[index] = action.payload
                    break;
                }
            }
            localStorage.setItem("Expense Data", JSON.stringify(editState.expenseList));
            return editState;

        default:
            return state;
    }
}