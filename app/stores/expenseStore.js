import { createStore, combineReducers } from 'redux';
import expenseReducer from '../reducers/expenseReducer';
import filtersReducer from '../reducers/filtersReducer';

export default () =>{

	return createStore(
			combineReducers({
				expenses : expenseReducer,
				filters : filtersReducer	
			})
		)
}


