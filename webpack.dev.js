const baseConfig = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const reStyle = /\.(css|scss|sass)$/;

module.exports = merge(baseConfig, {
	devtool: 'eval-source-map',
	output: {
		filename: '[name].bundle.[hash].js'
	},
	devServer: {
		inline: true,
		contentBase: path.resolve(__dirname, 'src'),
		host: '0.0.0.0',
		port: 9000,
		historyApiFallback: true,
		hot: true, // Hot module replacement
		stats: {
			assets: true,
			children: false,
			chunks: false,
			hash: false,
			modules: false,
			publicPath: false,
			timings: true,
			version: false,
			warnings: true,
			colors: {
				green: '\u001b[32m',
			}
		}
	},
	module: {
		rules: [
			{
				test: reStyle,
				include: [
					path.resolve(__dirname, '../')
				],
				use: [
					// Creates style nodes from JS strings
					{
						loader: 'style-loader'
					},

					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},

					// Apply PostCSS plugins including autoprefixer
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: './postcss.config.js',
							},
							importLoaders: 1
						}
					},

					// Compiles Sass to CSS
					{
						loader: 'sass-loader',
						options: {
							// sourceMap: true
						}
					},

					// Resolve images in SCSS
					// https://github.com/webpack-contrib/sass-loader#problems-with-url
					// {
					// 	loader: 'resolve-url-loader'
					// }
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			hash: true,
			minify: {
				collapseWhitespace: false
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	]
});
