import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'change';
let _walletState = [];
let itemInfoForEdit = {};


class WalletStore extends EventEmitter {

	constructor() {
		super();
		Dispatcher.register(this._registerToActions.bind(this));
	}

	_registerToActions(action){
		switch(action.actionType) {
			case "ADD_NEW_ITEM":
				this._addNewItem(action.payload);
			case "EDIT_ITEM":
				//console.log("Data in store: ",_walletState[action.payload]);
				itemInfoForEdit = _walletState[action.payload];
			break;
		}
	}

	_addNewItem(item){
		//console.log("Inside store:",item);
		item.id = _walletState.length;
		_walletState.push(item);
		this.emit('change');
	}

	getItemDetails(){
		return itemInfoForEdit;
	}

	getAllItems(){
		return _walletState;
	}

	// Calculate the total budget.
    getTotalBudget() {
        let totalBudget = 0;
 
        _walletState.forEach((item) => {
            totalBudget += parseFloat(item.amount);
        });
 
        return totalBudget;
    }
	
	// addChangeListner(callback){
	// 	this.on(CHANGE,callback);
	// }

	// removeChangeListner(callback){
	// 	this.removeListner(CHANGE,callback);
	// }

}


export default new WalletStore();