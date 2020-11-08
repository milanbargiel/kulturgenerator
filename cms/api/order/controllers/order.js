const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    const { id, slug } = ctx.request.body.artwork;
    console.log('id', id);
    console.log('slug', slug);

    // const orderedArtwork = await strapi.services.artwork.findOne({ slug });
    // console.log('orderedArtwork.quantity', orderedArtwork.quantity);

    // strapi.query('artwork').update({id: id}, { quantity: orderedArtwork.quantity - ctx.request.body.orderQuantity} );

    const orderedArtwork = await strapi.services.artwork.findOne({ slug });
    console.log('orderedArtwork.id', orderedArtwork.id);
    console.log('orderedArtwork.quantity', orderedArtwork.quantity);

    const updatedArtwork = await strapi.services.artwork.update({ id: orderedArtwork.id }, {
      quantity: orderedArtwork.quantity - ctx.request.body.orderQuantity
    });
    const artworkEntry = sanitizeEntity(updatedArtwork, { model: strapi.models.artwork });
    console.log('updatedArtwork.quantity', artworkEntry.quantity);

    const entity = await strapi.services.order.create(ctx.request.body);
    console.log('entity', entity.artwork.quantity);

    const entry = sanitizeEntity(entity, { model: strapi.models.order });
    console.log('entry start', entry.artwork.quantity);

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

    console.log('entry end', entry.artwork.quantity);
    return entry;
  },
};
