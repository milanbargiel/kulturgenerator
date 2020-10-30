// This configuration is used in development mode
// npm run build && npm run develop

module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: 1337,
  url: 'http://localhost:1337',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    }
  }
});
