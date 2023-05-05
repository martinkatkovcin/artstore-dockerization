const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('payment_method', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
