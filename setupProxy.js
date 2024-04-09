
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'https://godseye-g8d1.onrender.com',  // Assuming your server is running on port 3000
      changeOrigin: true,
    })
  );
};
