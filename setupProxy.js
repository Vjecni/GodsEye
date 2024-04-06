const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'https://godseye.up.railway.app/',  // Assuming your server is running on port 3000
      changeOrigin: true,
    })
  );
};
