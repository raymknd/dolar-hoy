const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        home: './src/home.js',
        noticias: './src/noticias.js' 
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'src/html', 'index.html'),
            chunks: ["home"]
        }),
        new HtmlWebpackPlugin({
            filename: 'noticias.html',
            inject: true,
            template: path.resolve(__dirname, 'src/html', 'noticias.html'),
            chunks: ["noticias"]
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './src/html/static',
                to: "static"
            }]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    // options: {
                    //     modules: true,
                    //     sourceMap: true,
                    //     importLoader: 2
                    // }
                },
                "sass-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ]
    }
}