const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('product_material', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};