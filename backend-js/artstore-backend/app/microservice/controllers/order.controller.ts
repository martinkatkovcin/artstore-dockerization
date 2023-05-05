const db = require('../../models/index.js');
const Order = db.orders;
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

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    sendMessage(res, 'Content can not be empty.', 400);
    return;
  }

  const order = {
    first_name: req.body.first_name ? req.body.first_name : null,
    last_name: req.body.last_name ? req.body.last_name : null,
    email: req.body.email ? req.body.email : null,
    phone_number: req.body.phone_number ? req.body.phone_number : null,
    address: req.body.address ? req.body.address : '',
    city: req.body.city ? req.body.city : '',
    zip_code: req.body.zip_code ? req.body.zip_code : '',
    finished: req.body.finished ? req.body.finished : false,
    payment_method_id: req.body.payment_method_id ? req.body.payment_method_id : 1,
    delivery_method_id: req.body.delivery_method_id ? req.body.delivery_method_id : 1,
    user_id: req.body.user_id ? req.body.user_id : null,
    voucher_id: req.body.voucher_id ? req.body.voucher_id : null,
  };

  Order.create(order).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the order.', 500);
    });
};

exports.fetchOrderHistory = (req, res) => {
  const user_id = req.params.id;
  const condition = user_id ? { user_id: { [Op.eq]: user_id } } : null;

  Order.findAll({ where: condition }).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving orders.', 500);
    });
};

exports.fetchActiveOrder = (req, res) => {
  const user_id = req.params.id;
  const condition = user_id ? {
    user_id: user_id,
    finished: false,
  } : null;

  Order.findOne({ where: condition }).then(data => {
      if (data) {
        res.send(data);
      } else {
        // If an active order is not found, create a new empty one
        const order = {
          first_name: null,
          last_name: null,
          email: null,
          phone_number: null,
          address: '',
          city: '',
          zip_code: 11111,
          finished: false,
          payment_method_id: 1,
          delivery_method_id: 1,
          user_id: user_id,
          voucher_id: null,
        };

        Order.create(order).then(data => {
            res.send(data);
          }).catch(err => {
            sendMessage(res, err.message || 'Some error occurred while creating the order.', 500);
          });
      }
    })
    .catch(() => {
      sendMessage(res, `Error retrieving order with id=${user_id}.`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Order was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update order with id=${id}. Maybe order was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating user with id=${id}.`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Order was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete order with id=${id}. Maybe order was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete order with id=${id}.`, 500);
    });
};

exports.finishOrder = (req, res) => {
  const id = req.params.id;

  Order.update({ finished: true }, {
    where: { id: id },
    truncate: false
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Order was finished successfully.', null);
      } else {
        sendMessage(res, `Cannot finish order with id=${id}. Maybe order was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error finishing order with id=${id}.`, 500);
    });
};
