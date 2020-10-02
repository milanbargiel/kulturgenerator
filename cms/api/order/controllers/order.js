const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.order.create(data, { files });
    } else {
      entity = await strapi.services.order.create(ctx.request.body);
    }
    
    const entry = sanitizeEntity(entity, { model: strapi.models.order });

    console.log(entry);

    if (entry) {
      // Send E-Mail to buyer
      await strapi.plugins['email'].services.email.send({
        to: entry.buyerEmail,
        from: 'info@kulturgenerator.de',
        subject: 'Vielen Dank für Ihren Einkauf',
        text: `Hallo ${entry.buyerFullname},\r\n\r\nSie haben ein Kunstwerk über den Kulturgenerator gekauft. Vielen Dank dafür!\r\n\r\nDie Künstlerin bzw. der Künstler wird sich bei Ihnen melden, um die Übergabe oder den Versand des Werkes zu besprechen.\r\n\r\n${entry.orderQuantity} x ${entry.artwork.author}: ${entry.artwork.title}\r\n\r\nBei Fragen wenden Sie sich gerne an info@kulturgenerator.de.\r\n\r\nFreundliche Grüße\r\nIhr Team des Kulturgenerators`,
        html: `Hallo ${entry.buyerFullname},<br><br>Sie haben ein Kunstwerk über den Kulturgenerator gekauft. Vielen Dank dafür!<br><br>Die Künstlerin bzw. der Künstler wird sich bei Ihnen melden, um die Übergabe oder den Versand des Werkes zu besprechen.<br><br><i>${entry.orderQuantity} x ${entry.artwork.author}: ${entry.artwork.title}</i><br><br>Bei Fragen wenden Sie sich gerne an info@kulturgenerator.de.<br><br>Freundliche Grüße<br>Ihr Team des Kulturgenerators`
      });

      // Send E-Mail to artist
      await strapi.plugins['email'].services.email.send({
        to: entry.artwork.email,
        from: 'info@kulturgenerator.de',
        subject: 'Ihr Kunstwerk wurde verkauft',
        text: `Hallo ${entry.artwork.author},\r\n\r\nsoeben wurde Ihr Kunstwerk über den Kulturgenerator verkauft, vielen Dank für Ihre Einreichung.\r\n\r\n${entry.orderQuantity} x ${entry.artwork.author}: ${entry.artwork.title}\r\n\r\nBitte schicken Sie das Kunstwerk an folgende Adresse und nehmen Sie Kontakt zur Käuferin bzw. zum Käufer zu Vereinbarung der Übergabe auf:\r\n\r\n${entry.buyerFullname}\r\n${entry.buyerEmail}\r\n${entry.buyerStreet}\r\n${entry.buyerCity}\r\n${entry.buyerState}\r\n${entry.buyerZipCode}\r\n\r\nBei Fragen zum weiteren Vorghehen wenden Sie sich gerne an info@kulturgenerator.de.\r\n\r\nFreundliche Grüße\r\nIhr Team des Kulturgenerators`,
        html: `Hallo ${entry.artwork.author},<br><br>soeben wurde Ihr Kunstwerk über den Kulturgenerator verkauft, vielen Dank für Ihre Einreichung.<br><br><i>${entry.orderQuantity} x ${entry.artwork.author}: ${entry.artwork.title}</i><br><br>Bitte schicken Sie das Kunstwerk an folgende Adresse und nehmen Sie Kontakt zur Käuferin bzw. zum Käufer zu Vereinbarung der Übergabe auf:<br><br>${entry.buyerFullname}<br>${entry.buyerEmail}<br>${entry.buyerStreet}<br>${entry.buyerCity}<br>${entry.buyerState}<br>${entry.buyerZipCode}<br><br>Bei Fragen zum weiteren Vorghehen wenden Sie sich gerne an info@kulturgenerator.de.<br><br>Freundliche Grüße<br>Ihr Team des Kulturgenerators`,
      });
    }

    return entry;
  },
};
