const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry:  path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    assetModuleFilename: "images/[name][ext]"
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
            minimize: true,
        }
      },
      {
        test: /\.s?css$/i,
        use:[
          {
           loader: MiniCssExtractPlugin.loader,
           options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader", 
          "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
            loader: "babel-loader",
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource"
    },
    {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.90],
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          },
          webp: {
            quality: 75
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: "index.html",
    }),
    new StylelintPlugin(),
    ],
};