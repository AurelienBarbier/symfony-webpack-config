// globals var defintions
var ENV = process.env.NODE_ENV;
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WriteFilePlugin = require('write-file-webpack-plugin');


// Configuration de base 
var baseConfig = {
	// Defintion des points d'entree
	entry:	{ 
		app:	__dirname + '/assets/js/app.js', 
	}, 
	//Definitions des repertoris et fichiers de sortie
	output:	{ 
		path:	__dirname + '/dist', 
		filename:	'[name].js', 
	}, 
	// Appel aux differents modules selon les besoins
	module: {
		rules:	[
		{
			// Concernant les fichiers scss
			test:	/.scss$/, 			
			use:	ExtractTextPlugin.extract({ 
				fallback:	'style-loader', 
				use:	[ { 
					loader:	'css-loader', 
					options:	{
						minimize:	{
							discardComments: {  removeAll:	true }, 
							core:	true,
							minifyFontValues:	true,
						}				
					}			
				}, 
				'sass-loader' ]
			})
		}
		]
	},
	plugins: [
		// Permet d'ecrire les fichiers meme en dev-server
		new WriteFilePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		// Regroupe les fichiers CSS dans 1 .css.
		new ExtractTextPlugin('main.css'),
	], 
};
// Ajout de fonctionnalite sur PROD
if (ENV === 'production') {
	baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin(
	{ 
		beautify:	false, 
		compress:	{ 
			screw_ie8:	true, 
			warnings:	false 
		}, 
		mangle:	{ 
			screw_ie8:	true, 
			keep_fnames:	true 
		}, 
		comments:	false 
	})
	);
}

// export configuration
module.exports = baseConfig;