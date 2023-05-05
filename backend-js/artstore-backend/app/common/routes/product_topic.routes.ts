module.exports = app => {
  const product_topics = require('../controllers/product_topic.controller.ts');

  const router = require('express').Router();

  router.post('/', product_topics.create);

  router.get('/', product_topics.findAll);

  router.get('/:id', product_topics.findOne);

  router.put('/:id', product_topics.update);

  router.delete('/:id', product_topics.delete);

  app.use('/api/product-topics', router);
};
