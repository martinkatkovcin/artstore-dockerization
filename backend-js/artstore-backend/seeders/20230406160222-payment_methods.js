const db = require('../app/models');
const PaymentMethod = db.payment_methods;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return PaymentMethod.bulkCreate([
      {
        name: 'Credit card'
      },
      {
        name: 'Cash on delivery'
      },
      {
        name: 'PayPal'
      },
      {
        name: 'Apple pay'
      },
      {
        name: 'Google pay'
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return PaymentMethod.destroy({
      where: {},
      truncate: false
    });
  }
};
