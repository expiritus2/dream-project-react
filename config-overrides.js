const { compose } = require("react-app-rewired");
const rewireEslint = require("react-app-rewire-eslint");

module.exports = {
  webpack: compose(
    // Enable eslint config while compiling with webpack.
    // The result will be output in terminal and browser.
    rewireEslint,
  ),
  jest: config => ({
    ...config,
    // Enable `lodash-es` transpile to es5 for jest testing.
    transformIgnorePatterns: ["/node_modules/(?!(lodash-es)/).*/"],
  }),
};
