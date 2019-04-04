const defaultFilterState = {
	text : '',
	sortBy: 'date',
	startDate : undefined,
	endDate : undefined
}

export default (state = defaultFilterState,action) =>{
	switch(action.type){
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text : action.text
			} 
		default :
			return state;
	}
}