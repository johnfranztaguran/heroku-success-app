const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('tye me ++++++++++++');
  app.use(proxy('/api/*', { target: 'http://dev.tritontek.com.ph:81' }));
};
