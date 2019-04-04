import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigoA200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';

//import reduxEgStore from '../stores/reduxEgStore';
import expenseStore from './stores/expenseStore';
import {addExpense} from './actions/expenseActions';

const store = expenseStore();

store.dispatch(addExpense({id:parseInt(Math.random() * 100),description:'First item',amount:900}));
store.dispatch(addExpense({id:parseInt(Math.random() * 100),description:'Second item',amount:200}));

const unsubscribe = store.subscribe(()=>{
	const getVisibleExpenses = (expenses ,{ text, sortBy ,startDate , endDate}) => {
		const filteredExpenses = expenses.filter((item)=>{
			const textMatch = item.description.toLowerCase().includes(text.toLowerCase()) 
			return textMatch;
		})
		return filteredExpenses;
	}
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log("Redux store update main.js : ", visibleExpenses)
})

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: indigoA200,
    	primary2Color: indigoA200,
	},
});

ReactDOM.render(

	<MuiThemeProvider >
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('app')
);
