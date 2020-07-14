const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    resolve: {
     modules: ['node_modules'],
     extensions: ['.js']
    },
    devServer: {
        contentBase: 'dist',
        port: 8080
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns : [{
                from: 'build/assets',
                to: 'assets'
            }]
        }),
        new HTMLWebpackPlugin({
            template: 'build/index.html',
            filename: 'index.html'
        })
    ]
}
