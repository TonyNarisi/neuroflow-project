const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
  // Use development as default mode for running local development server
	mode: 'development',
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /.scss$/,
				include: APP_DIR,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin()
		]
	},
	devServer: {
		contentBase: BUILD_DIR
	}
}