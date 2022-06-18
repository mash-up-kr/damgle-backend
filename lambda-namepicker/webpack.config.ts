import * as path from 'path';
import * as webpack from 'webpack';

module.exports = {
  entry: './src/entry.lambda.ts',
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/platform-express',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          'cache-manager',
          'class-validator',
          'class-transformer',
          'fastify-static',
          'point-of-view', // fastify-adapter#setViewEngine 사용할때 필요
          'pino-pretty',
          'long',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  stats: {
    warningsFilter: ['optional-require', 'load-package.util', 'load-adapter', (warning: any) => false],
  },
};
