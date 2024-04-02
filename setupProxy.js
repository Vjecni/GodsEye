const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/fetchData',
    createProxyMiddleware({
      target: 'http://localhost:3000',  // Assuming your server is running on port 3000
      changeOrigin: true,
    })
  );
};
