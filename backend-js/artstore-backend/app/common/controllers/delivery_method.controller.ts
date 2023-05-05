const db = require('../../models/index.js');
const DeliveryMethod = db.delivery_methods;

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

  const deliveryMethod = {
    name: req.body.name,
  };

  DeliveryMethod.create(deliveryMethod).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the delivery method.', 500);
    });
};

exports.findAll = (req, res) => {
  DeliveryMethod.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving delivery methods.', 500);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  DeliveryMethod.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find delivery method with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving delivery method with id=${id}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  DeliveryMethod.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Delivery method was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update delivery method with id=${id}. Maybe it was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating delivery method with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  DeliveryMethod.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Delivery method was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete delivery method with id=${id}. Maybe it was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete delivery method with id=${id}.`, 500);
    });
};
