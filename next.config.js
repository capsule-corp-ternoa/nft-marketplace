
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },

  target: 'experimental-serverless-trace'
}

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = /*(process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.SENTRY_AUTH_TOKEN) ? withSentryConfig(moduleExports, SentryWebpackPluginOptions) : */moduleExports;