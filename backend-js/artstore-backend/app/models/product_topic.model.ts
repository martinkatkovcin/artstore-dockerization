const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('product_topic', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
