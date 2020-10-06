const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Update a record.
   *
   * @return {Object}
   */

  async updateQuantity(ctx) {
    const { id } = ctx.params;
    if (typeof ctx.request.body.quantity === 'undefined') {
      return
    }
    const data = {
      quantity: ctx.request.body.quantity
    }
    let entity;
    entity = await strapi.services.artwork.update({ id }, data);

    return sanitizeEntity(entity, { model: strapi.models.artwork });
  },
  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: 'published',
    };

    if (ctx.query._q) {
      entities = await strapi.services.artwork.search(ctx.query);
    } else {
      entities = await strapi.services.artwork.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.artwork }));
  },
};
