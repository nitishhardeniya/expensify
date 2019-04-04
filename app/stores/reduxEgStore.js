import { createStore, combineReducers } from 'redux';

/*Eg1*/

/*const countReducer = (state = { count : 0}, action)=>{
	switch(action.type){
		case 'INCREMENT':
			return {
				count : state.count + action.incrementBy
			}
		case 'DECREMENT':
			return {
				count : state.count - 1
			}
		case 'RESET' : 
			return {
				count : 0
			}
		default:
			return state;
	}		
};

const store = createStore(countReducer)

const unsubscribe = store.subscribe(()=>{
	console.log("Store update : ",store.getState())
})

const incrementCount = () => ({
	type:'INCREMENT',
	incrementBy:5
})


store.dispatch(incrementCount());
store.dispatch(incrementCount());
store.dispatch({ type:'DECREMENT' });
store.dispatch({ type:'RESET' });*/








/*Eg2*/

//Action generators

const addExpense =  ({
		description = '',
		note = '',
		amount = 0,
		createdAt = 0
} = {} ) => ({
	type : 'ADD_EXPENSE',
	expense : {
		id:parseInt(Math.random() * 100),
		description,
		note,
		amount,
		createdAt
	}
});

const removeExpense = ({id}={}) => ({
	type : 'REMOVE_EXPENSE',
	id
})

const setTextFilter = ({ str } = {}) => ({
	type : 'SET_TEXT_FILTER',
	str
})



//Reducers

const defaultExpenseState = [];
const expenseReducer = (state = defaultExpenseState, action) => {
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

const defaultFilterState = {
	text : '',
	sortBy: 'date',
	startDate : undefined,
	endDate : undefined
}

const filtersReducer = (state = defaultFilterState,action) =>{
	switch(action.type){
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text : action.str
			} 
		default :
			return state;
	}
}


//Store

const store = createStore(
	combineReducers({
		expenses : expenseReducer,
		filters : filtersReducer	
	})
);

store.subscribe(()=>{
	console.log(store.getState())
})



//Dispatchers
const expenseOne = store.dispatch(addExpense({
	description:'Nitish is on top of world',
	note:'nothing',
	amount:12000
}))


const expenseTwo = store.dispatch(addExpense({
	description:'I am flying',
	note:'nothing',
	amount:500
}))

//console.log(expenseOne,expenseTwo);
store.dispatch(removeExpense({id:expenseTwo.expense.id}));
store.dispatch(setTextFilter({str:'top'}));


/*const demoState = {
	expenses : [{
		id: 101,
		description:'first item',
		note:'lakdlksd alkdlksdl',
		amount:1200,
		createdAt : 0
	}],
	filters :{
		text : 'rent',
		sortBy : 'amount',
		startDate : undefined,
		endDate : undefined
	}
}*/















