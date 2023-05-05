module.exports = app => {
  const product_materials = require('../controllers/product_material.controller.ts');

  const router = require('express').Router();

  router.post('/', product_materials.create);

  router.get('/', product_materials.findAll);

  router.get('/:id', product_materials.findOne);

  router.put('/:id', product_materials.update);

  router.delete('/:id', product_materials.delete);

  app.use('/api/product-materials', router);
};
