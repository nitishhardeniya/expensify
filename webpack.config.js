module.exports = {
	entry:['./app/main.js'],
	output: {
		path : __dirname,
		filename:'bundle.js'
	},
    	module: {
        	rules: [
        	    {
        	        loader: 'babel-loader',
        	        test: /\.js$/,
        	        exclude: /node_modules/
        	    }
        	]
   	 },
   	devServer: {
        	port: 3010,
            historyApiFallback:true
    	},
	mode: 'development'
};
