
module.exports = app => {
    const vouchers = require('../controllers/voucher.controller.ts');

    const router = require('express').Router();

    router.get('/', vouchers.findAll);

    app.use('/api/vouchers', router);
};
