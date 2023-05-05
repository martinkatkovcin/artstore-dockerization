const db = require('../../models/index.js');
const PaymentMethod = db.payment_methods;

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
  if (!req.body) {
    sendMessage(res, 'Content can not be empty.', 400);
    return;
  }

  const paymentMethod = {
    name: req.body.name,
  };

  PaymentMethod.create(paymentMethod).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the payment method.', 500);
    });
};

exports.findAll = (req, res) => {
  PaymentMethod.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving payment methods.', 500);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PaymentMethod.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find payment method with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving payment method with id=${id}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PaymentMethod.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Payment method was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update payment method with id=${id}. Maybe it was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating payment method with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PaymentMethod.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Payment method was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete payment method with id=${id}. Maybe it was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete payment method with id=${id}.`, 500);
    });
};
