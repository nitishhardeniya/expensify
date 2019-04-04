import request from 'superagent';
import WalletActions from '../actions/walletActions'

module.exports = {
	get() {
		console.log("Utils");
		request.get('https://api.github.com/users/octocat')
			//.set()
			.end((err,response)=> console.log(response));
	} 
}
//https://api.github.com/users/octocat