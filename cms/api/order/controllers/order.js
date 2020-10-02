const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.order.create(data, { files });
    } else {
      entity = await strapi.services.order.create(ctx.request.body);
    }
    
    const entry = sanitizeEntity(entity, { model: strapi.models.order });

    console.log(entry);

    // Send E-Mail
    if (entry) {
      await strapi.plugins['email'].services.email.send({
        to: 'milan.bargiel@googlemail.com',
        from: 'info@kulturgenerator.de',
        subject: 'Vielen Dank für Ihren Einkauf!',
        text: `
          Sie haben das Kunstwerk ${entry.artwork.author}: ${entry.artwork.title} gekauft. Vielen Dank dafür!
        `,
      });
    }

    return entry;
  },
};
