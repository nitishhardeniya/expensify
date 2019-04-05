import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter} from '../actions/filterActions';
import TextField from '@material-ui/core/TextField';

const ExpenseListFilters = (props) => (
	<div>
		Search : <TextField name="search_expense" value={props.filters.text} onChange={(e)=>{
			props.dispatch(setTextFilter({text:e.target.value}))
		}}/>
	</div>
)

export default connect((state)=>{
	return {
		filters : state.filters
	}
})(ExpenseListFilters);
