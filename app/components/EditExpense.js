import React from 'react';
import WalletStore from '../stores/walletStore'

class EditExpense extends React.Component {

	constructor(){
		super();
		this.state = {
            itemDetails: WalletStore.getItemDetails()
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