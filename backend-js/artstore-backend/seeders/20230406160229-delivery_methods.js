const db = require('../app/models');
const DeliveryMethod = db.delivery_methods;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return DeliveryMethod.bulkCreate([
      {
        name: 'Personal pickup'
      },
      {
        name: 'Postal delivery'
      },
      {
        name: 'DHL delivery'
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return DeliveryMethod.destroy({
      where: {},
      truncate: false
    });
  }
};
