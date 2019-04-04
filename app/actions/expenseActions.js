export function addExpense({id= 0,description = '',amount = 0,date = 0} = {}){
   return {
      type:'ADD_EXPENSE',
		expense:{
			id,
			description,
			amount,
			date
		}
    }
}


export function removeExpense({id}={}) {
	return {
		type : 'REMOVE_EXPENSE',
		id	
	}
}