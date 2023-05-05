module.exports = app => {
  const delivery_methods = require('../controllers/delivery_method.controller.ts');

  const router = require('express').Router();

  router.post('/', delivery_methods.create);

  router.get('/', delivery_methods.findAll);

  router.get('/:id', delivery_methods.findOne);

  router.put('/:id', delivery_methods.update);

  router.delete('/:id', delivery_methods.delete);

  app.use('/api/delivery-methods', router);
};
