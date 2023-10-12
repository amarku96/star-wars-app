// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://swapi.dev", // Replace with your API server's URL
      changeOrigin: true,
    })
  );
};
