import path from 'path';
import { fileURLToPath } from 'url';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Configuration & { devServer?: DevServerConfiguration } = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'chatApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ChatContainer': './src/components/Chat/ChatContainer',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        '@mui/material': { singleton: true },
        '@emotion/react': { singleton: true },
        '@emotion/styled': { singleton: true },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    hot: true,
  },
};

export default config;