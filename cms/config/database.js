module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'kulturgenerator'),
        username: env('DATABASE_USERNAME', 'kulturgenerator'),
        password: env('DATABASE_PASSWORD', 'mJgc*%475$uGD@ABT'),
      },
      options: {
        ssl: false,
      },
    },
  },
});
