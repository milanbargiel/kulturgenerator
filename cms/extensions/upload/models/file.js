'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const sharp = require('sharp');
const path = require('path');
const publicPath = path.join(__dirname, '../../../public');

const BREAKPOINTS = {
  large: 1000,
  small: 500,
};

const generateResponsiveFormats = async model => {
  
  // If uploaded file is not an image do nothing
  if (!model.mime.startsWith('image/')) {
    return [];
  }

  const srcFile = path.join(publicPath, model.url);

  // Create responsive image variants
  return Promise.all(
    Object.keys(BREAKPOINTS).map(key => {
      const breakpoint = BREAKPOINTS[key];

      if (breakpoint < model.width) {
        const url = path.join('uploads', `${key}_${model.hash}${model.ext}`);
        const outputPath = path.join(publicPath, url);

        const newFile = sharp(srcFile) // returns promise
          .resize({ width: breakpoint })
          .toFile(outputPath)
          .catch(err => strapi.log.error(err));

        if (newFile) {
          return {
            [key]: { url }
          };
        }
      }
    })
  );
};

module.exports = {
  lifecycles: {
    afterCreate: async model => {
      const variants = await generateResponsiveFormats(model);

      // Push image variants information to file model
      if (variants.length) {
        variants.forEach(variant => {
          model.formats = { ...model.formats, ...variant};
        });
      }
    }
  },
};