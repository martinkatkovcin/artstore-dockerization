const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('product_period', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};