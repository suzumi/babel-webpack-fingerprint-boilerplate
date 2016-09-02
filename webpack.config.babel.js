import 'babel-polyfill';
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const assetsPluginInstance = new AssetsPlugin();

export default {
  cache: DEBUG,

  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  entry: {
    mypage: ['./src/js/mypage.entry.js'],
    login: ['./src/js/login.entry.js']
  },

  output: {
    publicPath: 'dist/',
    sourcePrefix: '  ',
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].bundle.js',
  },

  target: 'web',

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${process.env.NODE_ENV || (DEBUG ? 'development' : 'production')}"` }),
    ...(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: VERBOSE, drop_console: true } }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ]),
    assetsPluginInstance
  ],

  resolve: {
    extensions: ['', '.js', '.ts'],
  },

  module: {
    loaders: [
      { test: /\.js?$/, include: [path.resolve(__dirname, 'src/js')], loader: 'babel' },
      { test: /\.ts?$/, include: [path.resolve(__dirname, 'src/js')], loader: 'babel' },
    ],
  },

};