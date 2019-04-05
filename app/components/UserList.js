import React from 'react';
import UserStore from '../stores/userStore';
import WalletActions from '../actions/walletActions';
import request from 'superagent';
import {Card, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Cell } from 'react-mdl';
import moment from 'moment';

class UserList extends React.Component {
	
	constructor(){
		super();
		this.state = {
			users : UserStore.getAllUsers(),
			userInfo:{},
			modalOpen:false
		};
		this._userDataReceived = this._userDataReceived.bind(this);
	}


	_onChange() {
        this.setState({ users: UserStore.getAllUsers() });
    }

    _userDataReceived(){
    	console.log("Update from Flux Stores");
    	this.setState({
    		userInfo : UserStore.getUserInfo()
    	})
    	this.setState({
    		modalOpen:true
    	});
    }

    componentDidMount() {
        //UserStore.on('change',this._onChange);
    	request.get('https://api.github.com/users')
			.end((err,response)=> {
				this.setState({ users : response.body})
			});
    }
 
    componentWillUnmount() {
        UserStore.removeListener('change',this._onChange);
    }

    handleOpen(login) {
    	WalletActions.getUserDetails({login:login});
    	UserStore.on('change',this._userDataReceived);
    }

    handleClose(){
    	this.setState({
    		modalOpen:false
    	})
    }

	render() {
		const modalActions = [
			<RaisedButton secondary={true} label="close" onClick={this.handleClose.bind(this)} />
		];
		
		return (
			<div className="user-list" style={{color:'#fff'}}>
				<Grid >
				{
					this.state.users.map((user)=>
						
							<Cell col={2} key={user.id}>
								<Card className="user-card">
									<CardMedia>
										<img src={user.avatar_url} />
									</CardMedia>
									<CardTitle title={user.login} />
									<CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.</CardText>
									<FlatButton primary={true} label="View details" onClick={() => this.handleOpen(user.login)}/>
								</Card>
							</Cell>
					)
				}
				</Grid>
				<Dialog title={ this.state.userInfo.name } open={this.state.modalOpen} actions={modalActions} onRequestClose={this.handleClose.bind(this)}>
					<Grid >
						<Cell col={3}>Location :</Cell>
						<Cell col={9}>{ this.state.userInfo.location}</Cell>
					</Grid>

					<Grid >
						<Cell col={3}>Created at :</Cell>
						<Cell col={9}>{ moment(this.state.userInfo.created_at).format('ll') }</Cell>
					</Grid>

					<Grid >
						<Cell col={3}>Company :</Cell>
						<Cell col={9}>{ this.state.userInfo.company}</Cell>
					</Grid>

					<Grid >
						<Cell col={3}>Followers :</Cell>
						<Cell col={9}>{ this.state.userInfo.followers}</Cell>
					</Grid>

					<Grid >
						<Cell col={3}>Public repos :</Cell>
						<Cell col={9}>{ this.state.userInfo.public_repos}</Cell>
					</Grid>

				</Dialog>
			
			</div>
		);
	}
}

export default UserList;
