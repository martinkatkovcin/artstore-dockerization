const db = require('../../models/index.js');
const UserCart = db.user_carts;
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

exports.addToCart = (req, res) => {
  // Validate request
  if (!req.body) {
    sendMessage(res, 'Content can not be empty.', 400);
    return;
  }

  const user_cart = {
    order_id: req.body.order_id ? req.body.order_id : null,
    product_id: req.body.product_id ? req.body.product_id : null,
  };

  UserCart.create(user_cart).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the user cart.', 500);
    });
};

exports.findUserCarts = (req, res) => {
  const order_id = req.params.id;
  const condition = order_id ? { order_id: { [Op.eq]: order_id } } : null;

  UserCart.findAll({ where: condition }).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving user carts.', 500);
    });
};

exports.removeFromCart = (req, res) => {
  const id = req.params.id;

  UserCart.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'User cart item was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete user cart with id=${id}. Maybe the item was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete user cart with id=${id}.`, 500);
    });
};
