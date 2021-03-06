"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SOCKET:
    '"http://' + process.env.VUE_APP_SOCKET + '/"' ||
    '"http://10.20.20.24:9090/"'
});
