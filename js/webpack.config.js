var webpack = require('webpack');


module.exports = {
	entry: {
		'muil': [
			'babel-polyfill',
			__dirname + '/src/index.js',
		],
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'utils': __dirname + '/src/utils',
		},
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
			},
		}],
	},
	output: {
		path: __dirname + '/../build',
		filename: '[name].min.js',
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
	],
};
