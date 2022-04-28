module.exports = {
  devServer: {
    allowedHosts: ['.lokal.host'],
    client: {
      webSocketTransport: 'ws',
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    webSocketServer: 'ws',
  },
  publicPath: '/',
};
