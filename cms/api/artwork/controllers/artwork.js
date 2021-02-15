const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Update a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.services.artwork.findOne({ slug });
    const artwork = sanitizeEntity(entity, { model: strapi.models.artwork });

    // Return round information even though status is private
    if (entity.status === 'ZweiteRunde' || entity.status === 'ErsteRunde') {
      artwork.status =  entity.status; 
    }

    return artwork;
  },
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      _publicationState: 'live', // Deny access via the api to drafts
    };

    if (ctx.query._q) {
      entities = await strapi.services.artwork.search(ctx.query);
    } else {
      entities = await strapi.services.artwork.find(ctx.query);
    }

    return entities.map(entity => {
      const artwork = sanitizeEntity(entity, { model: strapi.models.artwork });

      // Return round information even though status is private
      if (entity.status === 'ZweiteRunde' || entity.status === 'ErsteRunde') {
        artwork.status =  entity.status; 
      }
      
      return artwork;
    });
  },
  async create(ctx) {
    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.artwork.create(data, { files });
    } else {
      entity = await strapi.services.artwork.create(ctx.request.body);
    }

    const entry = sanitizeEntity(entity, { model: strapi.models.artwork });

    // Send submission was successful E-mail
    if (entry.email) {
      const email = await strapi.plugins['email'].services.email.renderMail(entry, 'artwork-submission');

      await strapi.plugins['email'].services.email.send({
        to: entry.email,
        from: 'info@kulturgenerator.org',
        subject: 'Wir haben Ihre Einreichung erhalten',
        text: email.text
      });
    }
    
    return entry;
  },
};
