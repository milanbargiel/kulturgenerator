// This configuration is used in development mode
// npm run build && npm run develop

module.exports = {
  host: '0.0.0.0',
  port: 1337,
  url: 'http://localhost:1337',
  admin: {
    auth: {
      secret: '32868dff0a05250d9edf538ac624f630',
    }
  }
};
