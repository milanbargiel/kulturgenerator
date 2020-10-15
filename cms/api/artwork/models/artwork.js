'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      data.timestamp = new Date();
      data.published = false; // Always set 'published' property to false on creation, so that field cannot be manipulated
    },
  },
};
