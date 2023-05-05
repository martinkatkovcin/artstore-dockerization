module.exports = app => {
  const users = require('../controllers/user.controller.ts');

  const router = require('express').Router();

  router.post('/', users.create);

  router.post('/login', users.login);

  router.get('/', users.findAll);

  router.get('/:id', users.findOne);

  router.put('/:id', users.update);

  router.delete('/:id', users.delete);

  app.use('/api/users', router);
};
