const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('order', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'payment_methods',
        key: 'id',
      }
    },
    delivery_method_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'delivery_methods',
        key: 'id',
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    voucher_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'vouchers',
        key: 'id',
      }
    },
  });
};