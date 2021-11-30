const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        teams: './src/js/teams.js',
        players: './src/js/players.js',
        shared: ['babel-polyfill'],
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