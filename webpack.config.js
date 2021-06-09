const path = require('path');

const rootDir = process.cwd();
const resolve = pathname => path.resolve(rootDir, pathname);

module.exports = {
  mode: 'production',
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'renett.min.js',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /.(js|jsx)$/,
            // exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
            },
            // test: ,
            // use: ["style-loader", "css-loader"],
          },
        ],
      },
      {
        test: /\.css$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader"},
    ],
  },
  // Чтобы всё бандлилось в один скрипт для подключения пользователем
  optimization: { splitChunks: false },
}