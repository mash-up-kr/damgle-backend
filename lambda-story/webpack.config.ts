import * as path from 'path';
import * as webpack from 'webpack';
import { captureSourceVersion } from '@damgle/utils';

module.exports = {
  entry: './src/entry.lambda.ts',
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      SOURCE_VERSION: captureSourceVersion(),
    }),
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          './swagger-ui-bundle.js',
          './swagger-ui-standalone-preset.js',
          'class-transformer/storage',
          'fastify-swagger',
          '@nestjs/microservices',
          '@nestjs/platform-fastify',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',

          // mongodb optionals
          'mongodb-client-encryption',
          'bson-ext',
          'kerberos',
          'aws4',
          'snappy',
          '@mongodb-js/zstd',
          'snappy/package.json',
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
    warningsFilter: [
      'optional-require',
      'load-package.util',
      'load-adapter',
      (warning: any) => false,
    ],
  },
};
