var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

/**
 * Plugins
 */
var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(debug ? 'development' : 'production')
    }),
];

/**
 * Uglify
 */
if ( ! debug) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
}

/**
 * Webpack configs
 */

module.exports = {
    context: path.join(__dirname, 'src'),
    cache: true,
    entry: {
        'index': './index.jsx',
    },
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: '[name].min.js'
    },
    plugins: plugins,
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, 'src'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./src'),
            path.resolve('./src/styles'),
            path.resolve('./node_modules')
        ]
    },
    devtool: debug ? 'eval' : null,
    devServer: {
        historyApiFallback: true
    }
};