const webpack = require("webpack");
const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:{
        'scattermodels.js':'./src/index.ts',
        'scattermodels.min.js':'./src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: '[name]',
        library: 'scattermodels',
        libraryTarget:'amd',
        umdNamedDefine:true
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions:['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        // new UglifyJsPlugin()
    ]
}