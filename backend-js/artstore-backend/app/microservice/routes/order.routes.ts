module.exports = app => {
  const orders = require('../controllers/order.controller.ts');

  const router = require('express').Router();

  router.post('/', orders.create);

  router.get('/history/:id', orders.fetchOrderHistory);

  router.get('/active/:id', orders.fetchActiveOrder);

  router.put('/:id', orders.update);

  router.delete('/:id', orders.delete);

  app.use('/api/orders', router);
};
