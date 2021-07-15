const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const rootDir = process.cwd();
const resolve = pathname => path.resolve(rootDir, pathname);

module.exports = (webpackEnv, options) => {
  const { mode = 'production', watch = false } = options;
  const isEnvProduction = mode === 'production';

  return {
    mode,
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: resolve('dist'),
      filename: 'renett.min.js'
    },
    devtool: !isEnvProduction && 'source-map',
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          // cache: true,
          // sourceMap: !isEnvProduction
        })
      ],
      splitChunks: false
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /.(js|jsx|ts|tsx)$/,
              // include: ['node_modules'],
              // exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          // exclude: /(node_modules|bower_components)/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              // options: {
              //   modules: true
              // }
            }
          ]
        },
        {
          test: /\.png|svg|jpg|gif$/,
          use: ["file-loader"],
        },
        {test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader"},
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: isEnvProduction ? 'production' : 'development',
        BABEL_ENV: isEnvProduction ? 'production' : 'development',
      })
    ].filter(Boolean),
    watch
  };
};