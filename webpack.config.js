var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'src/index.js',
  out: 'public',
  clearBeforeBuild: '!(assets)',
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({head: '<script src="/assets/config.js"></script>'})
    }
  }
})
