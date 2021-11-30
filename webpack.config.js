const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', {index: './src/js/index.js',
        players: './src/js/players.js'
    }],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'teams.html',
            template: './src/html/teams.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'players.html',
            template: './src/html/players.html',
        }),
    ],
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};