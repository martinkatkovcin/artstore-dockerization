const db = require('../../models/index.js');
const ProductPeriod = db.product_periods;

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

  const productPeriod = {
    name: req.body.name,
  };

  ProductPeriod.create(productPeriod).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the product period.', 500);
    });
};

exports.findAll = (req, res) => {
  ProductPeriod.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving product periods.', 500);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ProductPeriod.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find product period with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving product period with id=${id}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ProductPeriod.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product period was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update product period with id=${id}. Maybe it was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating product period with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ProductPeriod.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product period was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete product period with id=${id}. Maybe it was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete product period with id=${id}.`, 500);
    });
};
