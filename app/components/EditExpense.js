import React from 'react';

class EditExpense extends React.Component {

	constructor(){
		super();
		this.state = {
            itemDetails: []
        };
	}

	render(){
		return (
			<div>
				<p>Editing expense id : {this.props.match.params.id}</p>
				Expense: <span> {this.state.itemDetails.description} </span>
				Paid amount: <span>INR {this.state.itemDetails.amount}</span>
			</div>
		)
	}
}

export default EditExpense;