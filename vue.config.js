const fs = require('fs');

module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
      }
    }
  }