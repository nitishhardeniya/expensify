import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
//import DeleteIcon from 'material-ui/Delete';

import { connect } from 'react-redux';
import ExpenseListFilters from './ExpenseListFilters';
import {removeExpense} from '../actions/expenseActions';

const getTotalBudget = (items) => {
    let totalBudget = 0;

    items.forEach((item) => {
        totalBudget += parseFloat(item.amount);
    });

    return totalBudget;
}

const deleteExpense = (props,id) => {
    props.dispatch(removeExpense({id}));
}

const ItemsList = (props) => (
    <div>
        <ExpenseListFilters />
        <h3 className="total-budget">INR {getTotalBudget(props.expenses)}</h3>
        <ul className="items-list">
            {props.expenses.map((itemDetails) => {
                let amountType = parseFloat(itemDetails.amount) > 0 ? 'positive' : 'negative';
                return (
                    <li key={itemDetails.id}>{itemDetails.description} <span className={amountType}>{itemDetails.amount}</span> 
                        {/*<FlatButton primary={true} label="Edit" onClick={()=>this.editExpense(itemDetails.id)}/>*/}
                        {<FlatButton secondary={true} label="X" onClick={()=>deleteExpense(props,itemDetails.id)}/>}
                    </li>
                );
            })}
        </ul>
    </div>
);

export default connect((state)=>{
    return {
        expenses : state.expenses,
        filters : state.filters
    }
})(ItemsList);




