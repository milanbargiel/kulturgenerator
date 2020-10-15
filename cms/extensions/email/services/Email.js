const Email = require('email-templates');

const renderMail = (entry, templateFolder) => {
  const email = new Email();
  return email.renderAll(`../mail-templates/${templateFolder}`, { entry });
};

module.exports = {
  renderMail
};