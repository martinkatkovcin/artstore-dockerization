const db = require('../app/models');
const ProductMaterial = db.product_materials;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return ProductMaterial.bulkCreate([
      {
        name: 'Wood',
      },
      {
        name: 'Stone',
      },
      {
        name: 'Marble',
      },
      {
        name: 'Iron/Steel',
      },
      {
        name: 'Oil on canvas',
      },
      {
        name: 'Watercolor',
      },
      {
        name: 'Acrylic',
      },
      {
        name: 'Paper',
      },
      {
        name: 'Clay',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return ProductMaterial.destroy({
      where: {},
      truncate: false
    });
  }
};
