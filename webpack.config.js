const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const copyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		wxshare: './src/js/wxShare.js',
		index: './src/js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkHash:8].js',
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
				loader: miniCssExtractPlugin.loader
			}, 'css-loader'],
			exclude: /node_modules/,
			include: path.resolve(__dirname, 'src')
		}, {
			test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 500,
					outputPath: 'images'
				}
			}]
		}, {
			test: /\.htm|html$/,
			use: ['html-withimg-loader']
		}, {
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: 'jQuery'
			}, {
				loader: 'expose-loader',
				options: '$'
			}]
		}]
	},
	plugins: [
		// 每次启动清理dist目录
		new cleanWebpackPlugin(),
		// 分离css
		new miniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css',
		}),
		new optimizeCssAssetsWebpackPlugin(),
		// 复制静态文件
		new copyWebpackPlugin([{
			from: __dirname + '/src/public',
			to: __dirname + '/dist/public'
		}]),
		// html 
		new htmlWebpackPlugin({
			title: 'index',
			filename: 'index.html',
			minify: {
				removeAttibuteQuotes: true
			},
			hash: true,
			chunks: ['wxshare', 'index'],
			template: './src/index.html'
		}),

	],
// 	optimization: {
//         minimizer: [
//             new optimizeCssAssetsWebpackPlugin()
//         ]
//     },
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		host: '192.168.1.103',
		port: 1717
	}
}
