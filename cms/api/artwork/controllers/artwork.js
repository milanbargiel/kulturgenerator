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
    return sanitizeEntity(entity, { model: strapi.models.artwork });
  },

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
};
