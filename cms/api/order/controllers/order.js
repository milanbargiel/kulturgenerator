const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const Email = require('email-templates');

const renderMail = (entry, templateFolder) => {
  const email = new Email();
  return email.renderAll(`../mails/${templateFolder}`, { entry });
};

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

    if (entry) {
      // Pass entry data to templates
      const buyerMail = await renderMail(entry, 'artwork-purchased');
      const artistMail = await renderMail(entry, 'artwork-sold');
      
      // Send E-Mail to buyer
      await strapi.plugins['email'].services.email.send({
        to: entry.buyerEmail,
        from: 'info@kulturgenerator.de',
        subject: 'Vielen Dank für Ihren Einkauf',
        text: buyerMail.text
      });

      // Send E-Mail to artist
      await strapi.plugins['email'].services.email.send({
        to: entry.artwork.email,
        from: 'info@kulturgenerator.de',
        subject: 'Ihr Kunstwerk wurde verkauft',
        text: artistMail.text
      });
    }

    return entry;
  },
};
