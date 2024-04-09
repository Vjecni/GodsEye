
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,  // Assuming your server is running on port 3000
      changeOrigin: true,
    })
  );
};
