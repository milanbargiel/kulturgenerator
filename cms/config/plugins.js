module.exports = ({ env }) => ({
  // configuration for strapi-provider-email-gmail-2lo
  email: {
    provider: 'gmail-2lo',
    providerOptions: {
      username: 'info@kulturgenerator.de', // use .de because .org is only an alias for g-mail
      clientId: env('EMAIL_CLIENT_ID'),
      privateKey: env('EMAIL_PRIVATE_KEY').replace(/\\n/g, '\n'),
    },
    settings: {
      defaultFrom: 'info@kulturgenerator.org',
      defaultReplyTo: 'info@kulturgenerator.org',
    },
  },
});
