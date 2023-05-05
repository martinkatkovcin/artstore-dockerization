const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('voucher', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};