import { addExpense ,removeExpense } from '../../actions/expenseActions';


test('Should setup add expense action generator',()=>{

	const action = addExpense({
			id:1,
			description:"item desc",
			amount:200,
			date:null
		});
	expect(action).toEqual({
      type:'ADD_EXPENSE',
		expense:{
			id:1,
			description:"item desc",
			amount:200,
			date:null
		}
    });
});

test('Should setup remove expense action generator',()=>{

	const action = removeExpense({id:20});
	expect(action).toEqual({
		type : 'REMOVE_EXPENSE',
		id : 20	
	})
});