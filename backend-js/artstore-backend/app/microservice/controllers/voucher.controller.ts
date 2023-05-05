const db = require('../../models/index.js');
const Voucher = db.vouchers;
const { Op } = require('sequelize');

function sendMessage(res, message, status) {
    if (status === null) {
        res.send({
            message: message
        });
    }
    else {
        res.status(status).send({
            message: message
        });
    }
}

exports.findAll = (req, res) => {

    Voucher.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        sendMessage(res, err.message || 'Some error occurred while retrieving products.', 500);
    });
};