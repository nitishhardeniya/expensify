import React, { Component } from 'react';
import { Switch,Route,NavLink } from 'react-router-dom';

import AddExpense from './../components/AddExpense';
import ItemsList from './../components/ItemsList';
import EditExpense from './../components/EditExpense';
import UserList from './../components/UserList';

const Header = () => {
	return (
		<div className="app-header">
			<div className="app-title">Expensify</div>
			<nav>
				<NavLink to="/" activeClassName="active-link">Home</NavLink>
				<NavLink to="/create" activeClassName="active-link">Create Expense</NavLink>
				{/*<NavLink to="/edit/44" activeClassName="active-link">Edit Expense</NavLink>*/}
				<NavLink to="/users" activeClassName="active-link">Users</NavLink>
			</nav>
		</div>
	)
};

const Section = () => (
	
		<Switch>
			<Route path="/" component={ItemsList} exact/>
			<Route path="/create" component={AddExpense} />
			<Route path="/edit/:id" component={EditExpense} />
			<Route path="/users" component={UserList} />
		</Switch>
	
);

export default class App extends Component {
    render(){
        return (
            <div className="app-container">
            	<Header />
            	<Section />
            </div>
        );
    }
}
