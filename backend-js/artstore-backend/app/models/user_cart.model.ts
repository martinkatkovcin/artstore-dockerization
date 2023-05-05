const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user_cart', {
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      }
    },
  });
};