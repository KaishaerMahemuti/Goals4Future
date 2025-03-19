// client/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your React app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3005,
    open: true // Automatically open the browser
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Use babel-loader for JS and JSX files
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html' // Template for the HTML file
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
