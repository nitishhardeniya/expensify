import React from 'react';
import UserStore from '../stores/userStore';
import WalletActions from '../actions/walletActions';
import request from 'superagent';

//Material-ui imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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
			<Button color="secondary" onClick={this.handleClose.bind(this)} >close </Button>
		];
		
		return (
			<div className="user-list" style={{color:'#fff'}}>
				<Grid >
				{
					this.state.users.map((user)=>
						
							<Cell col={2} key={user.id}>
								<Card className="user-card">
							      <CardActionArea>
							        <CardMedia 
							        	component="img"
							        	height="200"
							        	image={user.avatar_url}
							        />
							        <CardContent>
							          <Typography gutterBottom variant="h5" component="h2">
							            {user.login}
							          </Typography>
							          <Typography component="p">
							            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.
							          </Typography>
							        </CardContent>
							      </CardActionArea>
							      <CardActions>
							        <Button color="primary" onClick={() => this.handleOpen(user.login)} >View details</Button>
							      </CardActions>
							    </Card>

							</Cell>
					)
				}
				</Grid>
				<Dialog open={this.state.modalOpen} actions={modalActions}>
					<MuiDialogTitle id="customized-dialog-title" onClose={this.handleClose.bind(this)}>
		            	{this.state.userInfo.name}
		          	</MuiDialogTitle>
					<MuiDialogContent>
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
					</MuiDialogContent>
					<MuiDialogActions>
			            {modalActions}
			        </MuiDialogActions>

				</Dialog>
			
			</div>
		);
	}
}

export default UserList;
