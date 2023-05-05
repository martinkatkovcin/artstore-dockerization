const db = require('../app/models');
const ProductTopic = db.product_topics;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return ProductTopic.bulkCreate([
      {
        name: 'Nature',
      },
      {
        name: 'Still life',
      },
      {
        name: 'Architecture',
      },
      {
        name: 'Abstract',
      },
      {
        name: 'Historical',
      },
      {
        name: 'Sacral',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return ProductTopic.destroy({
      where: {},
      truncate: false
    });
  }
};
