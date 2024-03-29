const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const { slug } = ctx.request.body.artwork;

    const orderedArtwork = await strapi.services.artwork.findOne({ slug });

    await strapi.services.artwork.update({ id: orderedArtwork.id }, {
      quantity: orderedArtwork.quantity - ctx.request.body.orderQuantity
    });

    const entity = await strapi.services.order.create(ctx.request.body);
    const entry = sanitizeEntity(entity, { model: strapi.models.order });

    if (entry) {
      // Pass entry data to templates
      const buyerMail = await strapi.plugins['email'].services.email.renderMail(entry, 'artwork-purchased');
      const artistMail = await strapi.plugins['email'].services.email.renderMail(entry, 'artwork-sold');

      // Send E-Mail to buyer
      await strapi.plugins['email'].services.email.send({
        to: entry.buyerEmail,
        from: 'info@kulturgenerator.org',
        subject: 'Vielen Dank für Ihren Einkauf',
        text: buyerMail.text
      });

      // Send E-Mail to artist
      await strapi.plugins['email'].services.email.send({
        to: entry.artwork.email,
        from: 'info@kulturgenerator.org',
        subject: 'Ihr Kunstwerk wurde verkauft',
        text: artistMail.text
      });
    }

    return entry;
  },
};
