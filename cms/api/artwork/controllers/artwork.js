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
};
