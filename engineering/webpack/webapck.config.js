const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    //output: './dist/bundle.js'
    module: {
        rules: [{ 
            test: /\.txt$/, 
            use: 'raw-loader' 
        }],
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
}