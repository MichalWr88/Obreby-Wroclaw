const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "./css/style.css",
});

module.exports = {
  entry: {
    google: "./app/es6/google.js",
    lealfet: "./app/es6/lealfelt.js",
    index: "./app/es6/script.js",
  },

  output: {
    path: path.resolve(__dirname, "./app/dev"),
    filename: "[name].js",
  },

  watch: true,
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: "style-loader", // zabezpieczenie gdy nie mozna pliku zapisac
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [new require("autoprefixer")()],
                sourceMap:true
              },
            },
            {
              loader: "sass-loader",
                options: {
                  sourceMap:true,
                }
              
            },
          ],
        }),
      },
    ], //rules
  }, //module

  plugins: [
    extractSass,
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: "localhost",
      port: 3000,
      server: {
        baseDir: ["app/"],
      },
    }),
    new webpack.ProvidePlugin({
      $: ['jquery'],
      jQuery: ['jquery'],
      'window.jQuery': 'jquery',
  })
  ],
};
