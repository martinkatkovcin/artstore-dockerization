const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('delivery_method', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};