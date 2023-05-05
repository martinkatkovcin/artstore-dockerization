const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    logging: true,
  }
);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  users: null,
  payment_methods: null,
  delivery_methods: null,
  vouchers: null,
  product_periods: null,
  product_topics: null,
  product_materials: null,
  products: null,
  orders: null,
  user_carts: null,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.ts')(sequelize);
db.payment_methods = require('./payment_method.model.ts')(sequelize);
db.delivery_methods = require('./delivery_method.model.ts')(sequelize);
db.vouchers = require('./voucher.model.ts')(sequelize);
db.product_periods = require('./product_period.model.ts')(sequelize);
db.product_topics = require('./product_topic.model.ts')(sequelize);
db.product_materials = require('./product_material.model.ts')(sequelize);
db.products = require('./product.model.ts')(sequelize);
db.orders = require('./order.model.ts')(sequelize);
db.user_carts = require('./user_cart.model.ts')(sequelize);

module.exports = db;
