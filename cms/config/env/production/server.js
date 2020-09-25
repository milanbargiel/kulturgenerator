// This configuration is used if production environment is explicitly set with
// NODE_ENV=production npm run build
// NODE_ENV=production npm start

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://xyz.kulturgenerator.de',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '32868dff0a05250d9edf538ac624f630'),
    }
  }
})
