var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = {
	entry: {
		'muil': [
			'@babel/polyfill',
			__dirname + '/src/index.js',
			path.join(
				__dirname, '../sass/muil.sass'
			)
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
		},
		{
			test: /\.s(a|c)ss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				'css-loader?-url',
				{
					loader: 'sass-loader',
					options: {
						sassOptions: {
							outputStyle: 'compressed',
						},
					},
				},
			],
		}
		],
	},
	output: {
		path: __dirname + '/../build',
		filename: '[name].min.js',
	},
	optimization: {
		chunkIds: 'total-size',
		moduleIds: 'size',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '/../build/[name].min.css',
		}),
	]
};
