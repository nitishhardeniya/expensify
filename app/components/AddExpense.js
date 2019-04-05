import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid , Cell} from 'react-mdl';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import {addExpense} from '../actions/expenseActions';

class AddExpense extends React.Component {
 
    // Set the initial state.
    constructor(props) {
        super(props);
    
        this.state = {
            item: this._getFreshItem()
        };

        this._getFreshItem = this._getFreshItem.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }
    
    handleDate(event, date){
        let newItem = {
            description:this.state.item.description,
            amount:this.state.item.amount,
            date:date
        }
        this.setState({item: newItem})
    }

    // Return a fresh item.
    _getFreshItem() {
        return {
            description: '',
            amount: '',
            date:null
        };
    }
 
    // Update the state.
    _updateState(event) {
        let field = event.target.name;
        let value = event.target.value;
 
        // If the amount is changed and it's not a float, return.
        if (value && field === 'amount' && !value.match(/^[a-z0-9.\+\-]+$/g)) {
            return;
        }
 
        this.state.item[field] = value;
        this.setState({ item : this.state.item });
    }
 
    // Add a new item.
    _addNewItem(event) {

        event.preventDefault();
        let newItem = {
            description:this.state.item.description || '-',
            amount:this.state.item.amount || '0'
        };
        this.setState({
            item: newItem
        },()=>{
            this.props.dispatch(addExpense({description:newItem.description,amount:newItem.amount}));
            this.setState({ item : this._getFreshItem() });    
            this.props.history.push('/');
        })
        
    }
 
    render() {
        return (
            <div>
                <form className="form-inline add-item" onSubmit={this._addNewItem.bind(this)}>
                    <Grid>
                        <Cell col={6}>
                            <Cell col={12}>
                                <TextField name="description" label="Description" value={this.state.item.description} placeholder="Description" onChange={this._updateState.bind(this)} />
                            </Cell>
                            <Cell col={12}>
                                <TextField name="amount" label="Amount" value={this.state.item.amount} placeholder="Amount" onChange={this._updateState.bind(this)} />        
                            </Cell>
                            <Cell col={12}>
                                <DatePicker value={this.state.item.date} onChange={this.handleDate.bind(this)} hintText="Select a date"/>
                            </Cell>
                            <Cell col={12}>
                                <RaisedButton primary={true} label="Add" type="submit"/>
                            </Cell>
                        </Cell>

                        <Cell col={6}></Cell>
                        
                    </Grid>
                </form>

            </div>
        )
    }
}
 
export default connect((state)=>{
    return {
        expenses : state.expenses,
        filters : state.filters
    };
})(AddExpense);




