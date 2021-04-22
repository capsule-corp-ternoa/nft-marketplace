const nodeExternals = require('webpack-node-externals');
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on fs module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    config.externals = [nodeExternals()];
    return config;
  },
  target: 'serverless',
};
