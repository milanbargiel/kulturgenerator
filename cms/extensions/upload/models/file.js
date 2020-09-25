'use strict';

// Custom lifecycle hook for files to create image variants after upload
// The Strapi method was timeouting on production server so we decided to build this functionality by ourselves
// Make sure to deactive "Enable responsive friendly upload" in Admin Panel settings, to deactivate Strapi image variants

const sharp = require('sharp');
const path = require('path');
const publicPath = path.join(__dirname, '../../../public');

const BREAKPOINTS = {
  x2: 1600,
  large: 800,
  medium: 500,
  small: 320,
};

const bytesToKbytes = bytes => Math.round((bytes / 1000) * 100) / 100;

const generateResponsiveFormats = async model => {
  
  // If uploaded file is not an image do nothing
  if (!model.mime.startsWith('image/')) {
    return [];
  }

  const srcFile = path.join(publicPath, model.url);

  // Create responsive image variants
  return Promise.all(
    Object.keys(BREAKPOINTS).map(async key => {
      const breakpoint = BREAKPOINTS[key];

      if (breakpoint < model.width) {
        const url = path.join('uploads', `${key}_${model.hash}${model.ext}`);
        const outputPath = path.join(publicPath, url);

        // Optimize and resize image with sharp package
        const newFile = await sharp(srcFile)
          .resize({ width: breakpoint })
          .toFile(outputPath)
          .catch(err => strapi.log.error(err));

        if (newFile) {
          const { size, width, height } = newFile;

          // Return metadata
          return {
            [key]: { 
              url,
              size: bytesToKbytes(size),
              width,
              height
            }
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