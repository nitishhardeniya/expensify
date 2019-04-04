import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';
import UserAPI from '../utils/UserAPI';
import request from 'superagent';

class WalletActions {

	addNewItem(item){
		//console.log("Inside Action (Add):",item);
		Dispatcher.dispatch({
			actionType : ActionTypes.ADD_NEW_ITEM,
			payload : item
		});
	}

	editExpense(itemId){
		//console.log("Inside Action (Edit)",itemId);
		Dispatcher.dispatch({
			actionType : ActionTypes.EDIT_ITEM,
			payload : itemId
		})
	}

	listAllUsers(response){
		//console.log("Inside Action (List)");
		Dispatcher.dispatch({
			actionType : "LIST_USERS",
			response : response
		});

		UserAPI.get();
	}

	getUserDetails(user){
		//console.log("Inside Action (Info)",user);

		request.get('https://api.github.com/users/'+user.login)
			.end((err,response)=>{
				Dispatcher.dispatch({
					actionType : "USER_INFO",
					response:response.body
				})
			
			})

	}
}

export default new WalletActions();