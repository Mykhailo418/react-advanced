'use strict';

const webpack = require('webpack');
const mode = 'development';
const DEV_ENV = (mode == 'development') ? true : false;

module.exports = {
	mode: mode,
	entry: {
		app: './js/app.js'
	},
	output: {
		path: __dirname + '/comp',
		filename: "[name].js",
		library: "[name]"
	},

	watch: true,

	devtool: "source-map",

	plugins: [
		new webpack.DefinePlugin({
			DEV_ENV : DEV_ENV
 		}),
 	],

	module : {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: [/node_modules/],
		},
		{
			test: /\.scss$/,
			loader: 'style-loader!css-loader!sass-loader',
			exclude: [/node_modules/],
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader',
		}
		]
	}
}
