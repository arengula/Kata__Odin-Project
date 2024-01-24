const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: "inline-source-map",
	devServer: {
		static: './dist',
		port: 8888,
	},
	module: {
		rules: [
			{ test: /\.css/,
				use: [ "style-loader", "css-loader" ]
			}
		]
	}
};
