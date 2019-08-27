const webpack = require('webpack'),
    path = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    { CleanWebpackPlugin }   = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    ManifestPlugin = require('webpack-manifest-plugin')
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => {
	return {
		mode: env && env.build === 'true' ? "production" : "development",
		entry: {
			home : "./public/javascripts/index",
			vendor: ["jquery", "bootstrap"]
		},
		output: {
			path: path.resolve(__dirname, "public/bundle"),
			publicPath: '/bundle/',
			filename: env && env.build === 'true' ? "[name]-[hash].js": "[name].js",
		},
		module: {
	      	rules: [
	      		{
	                test: [/.js$/],
	                exclude: /(node_modules)/,
	                use: {
	                    loader: 'babel-loader',
	                    options: {
	                        presets: [
	                            '@babel/preset-env'
	                        ]
	                    }
	                }
	            },
		        {
		          test: /\.css$/,
		          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
		        },
		        {
	         		test: /\.(png|svg|jpg|gif)$/,
	         		use: [
	           			'file-loader'
			      	]
		      	},
		      	{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [
						'file-loader'
					]
		       },
        	]
    	},
    	plugins: [
    		new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
	     	new CleanWebpackPlugin(),
	     	require('autoprefixer'),
	     	new MiniCssExtractPlugin({
				filename: 'style.css'
			}),
  			new CopyWebpackPlugin([{     
  				from:'public/images/',
  				to:'assets/images'   
  			}]),
  			new UglifyJsPlugin(),
  			new OptimizeCSSAssetsPlugin(),
  			new ManifestPlugin({
                basePath: '/bundle/'
            })
	    ]
	}
 };