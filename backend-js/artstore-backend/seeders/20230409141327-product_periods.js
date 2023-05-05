const db = require('../app/models');
const ProductPeriod = db.product_periods;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return ProductPeriod.bulkCreate([
      {
        name: 'Antique',
      },
      {
        name: 'Romanesque',
      },
      {
        name: 'Gothic',
      },
      {
        name: 'Renaissance',
      },
      {
        name: 'Baroque',
      },
      {
        name: 'Neoclassicism',
      },
      {
        name: 'Romanticism',
      },
      {
        name: 'Realism',
      },
      {
        name: 'Impressionism',
      },
      {
        name: 'Expressionism',
      },
      {
        name: 'Surrealism',
      },
      {
        name: 'Pop-Art',
      },
      {
        name: 'Contemporary',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return ProductPeriod.destroy({
      where: {},
      truncate: false
    });
  }
};
