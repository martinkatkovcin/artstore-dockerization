module.exports = app => {
  const user_carts = require('../controllers/user_cart.controller.ts');

  const router = require('express').Router();

  router.post('/', user_carts.addToCart);

  router.get('/:id', user_carts.findUserCarts);

  router.delete('/:id', user_carts.removeFromCart);

  app.use('/api/user_cart', router);
};
