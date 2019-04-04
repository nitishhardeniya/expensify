import React from 'react';
//import WalletActions from '../actions/walletActions';
import WalletStore from '../stores/walletStore';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
//import DeleteIcon from 'material-ui/Delete';

import { connect } from 'react-redux';
import ExpenseListFilters from './ExpenseListFilters';
import {removeExpense} from '../actions/expenseActions';

class ItemsList extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            //items: WalletStore.getAllItems()
            items : props.expenses
        };
        //this._onChange = this._onChange.bind(this);
        this.editExpense = this.editExpense.bind(this);
    }
 
    /*_onChange() {
        this.setState({ items: WalletStore.getAllItems() });
    }

    componentWillMount() {
        WalletStore.on('change',this._onChange);
    }
 
    componentWillUnmount() {
        WalletStore.removeListener('change',this._onChange);
    }*/

    editExpense(id){
        WalletActions.editExpense(id);
        this.props.history.push("/edit/"+id);
    }

    deleteExpense(id){
        let newItemsList = [...this.state.items].filter((item)=>item.id != id)
        this.setState({
            items : newItemsList
        })
        this.props.dispatch(removeExpense({id}));
    }

    getTotalBudget() {
        let totalBudget = 0;
 
        this.state.items.forEach((item) => {
            totalBudget += parseFloat(item.amount);
        });
 
        return totalBudget;
    }
 
    render() {
 
        let noItemsMessage;
        
        // Show a friendly message instead if there are no items.
        if (!this.state.items.length) {
            noItemsMessage = (<li className="no-items">Your wallet is new!</li>);
        }
    

        return (
            <div>
                <ExpenseListFilters />
                <h3 className="total-budget">INR {this.getTotalBudget()}</h3>
                <ul className="items-list">
                    {noItemsMessage}
                    {this.state.items.map((itemDetails) => {
                        let amountType = parseFloat(itemDetails.amount) > 0 ? 'positive' : 'negative';
                        return (
                            <li key={itemDetails.id}>{itemDetails.description} <span className={amountType}>{itemDetails.amount}</span> 
                                {/*<FlatButton primary={true} label="Edit" onClick={()=>this.editExpense(itemDetails.id)}/>*/}
                                {<FlatButton secondary={true} label="X" onClick={()=>this.deleteExpense(itemDetails.id)}/>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default connect((state)=>{
    return {
        expenses : state.expenses,
        filters : state.filters
    }
})(ItemsList);




