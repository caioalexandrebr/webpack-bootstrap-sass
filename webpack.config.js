const ConcatPlugin = require('webpack-concat-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    './assets/sass/index.scss'
  ],
  output: {
    path: __dirname + "/dist",
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  watchOptions: {
    ignored: [
      /node_modules/,
    ]
  },
  plugins: [
    new ConcatPlugin({
      uglify: false,
      sourceMap: false,
      name: 'index',
      outputPath: 'js/',
      fileName: '[name].js',
      filesToConcat: ['./assets/js/**.js'],
      attributes: {
        async: true
      }
    }),
    new ConcatPlugin({
      uglify: false,
      sourceMap: false,
      name: 'vendors',
      outputPath: 'js/',
      fileName: '[name].js',
      filesToConcat: ['./node_modules/jquery/dist/jquery.min.js'],
      attributes: {
        async: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    new BrowserSyncPlugin({
      files: [
        'index.html',
        'assets/**/*.css'
      ],
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['.']
      }
    })
  ]
};