const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    product_period_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_periods',
        key: 'id',
      }
    },
    product_topic_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_topics',
        key: 'id',
      }
    },
    product_material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_materials',
        key: 'id',
      }
    },
  });
};