module.exports = app => {
  const payment_methods = require('../controllers/payment_method.controller.ts');

  const router = require('express').Router();

  router.post('/', payment_methods.create);

  router.get('/', payment_methods.findAll);

  router.get('/:id', payment_methods.findOne);

  router.put('/:id', payment_methods.update);

  router.delete('/:id', payment_methods.delete);

  app.use('/api/payment-methods', router);
};
