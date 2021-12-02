const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: ['babel-polyfill', './src/js/index.js'],
        teams: ['babel-polyfill', './src/js/teams.js', './src/js/detail.js'],
        players: ['babel-polyfill', './src/js/players.js'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'teams.html',
            template: './src/html/teams.html',
            chunks: ['teams'],
        }),
        new HtmlWebpackPlugin({
            filename: 'players.html',
            template: './src/html/players.html',
            chunks: ['players'],
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