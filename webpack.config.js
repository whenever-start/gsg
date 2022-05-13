/** @type {import('webpack').Configuration} */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false
    }
  },

  module: {
    rules: [
      // ts
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '58',
                      ie: '11'
                    },
                    corejs: '3',
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ]
      },
      // less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg|ico)/,
        type: 'asset',
        generator: {
          filename: 'img/[hash][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),

    new CleanWebpackPlugin()
  ]
}
