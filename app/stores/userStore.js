import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

let _userList = [];
let _userData = {};

class UserStore extends EventEmitter {
	
	constructor(){
		super();
		Dispatcher.register(this._registerToActions.bind(this));
	}
	
	_registerToActions(action){
		switch(action.actionType) {
			case "LIST_USERS":
				this.emit('change');
			case "USER_INFO":
				this._sendUserInfo(action.response);
				this.emit('change');
			break;
		}
	}

	_sendUserInfo(userResponse){
		console.log("Data received in Store");
		this._userData = userResponse;
	}

	getUserInfo(){
		return this._userData;
	}

	getAllUsers(){
		return _userList;
	}

}

export default new UserStore();
