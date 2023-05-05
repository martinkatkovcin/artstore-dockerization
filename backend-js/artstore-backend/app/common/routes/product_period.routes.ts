module.exports = app => {
  const product_periods = require('../controllers/product_period.controller.ts');

  const router = require('express').Router();

  router.post('/', product_periods.create);

  router.get('/', product_periods.findAll);

  router.get('/:id', product_periods.findOne);

  router.put('/:id', product_periods.update);

  router.delete('/:id', product_periods.delete);

  app.use('/api/product-periods', router);
};
