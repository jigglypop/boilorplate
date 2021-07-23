const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: 'production',
    resolve: {
        extensions: ['.ts','.js','.json']
    },
    output: {
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'public/[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/public/', to: "./public" },
                { from: 'src/favicon.ico', to: './favicon.ico' },
            ]
        }),
    ]

}