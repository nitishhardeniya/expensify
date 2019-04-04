const defaultExpenseState = [];
export default (state = defaultExpenseState, action) => {
	switch(action.type){
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			]
		case 'REMOVE_EXPENSE':
			return state.filter(( {id} )=> id != action.id);;
		default :
			return state;
	}
}