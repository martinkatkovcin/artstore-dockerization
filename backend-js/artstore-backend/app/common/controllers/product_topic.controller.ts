const db = require('../../models/index.js');
const ProductTopic = db.product_topics;

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

  const productTopic = {
    name: req.body.name,
  };

  ProductTopic.create(productTopic).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the product topic.', 500);
    });
};

exports.findAll = (req, res) => {
  ProductTopic.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving product topics.', 500);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ProductTopic.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find product topic with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving product topic with id=${id}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ProductTopic.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product topic was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update product topic with id=${id}. Maybe it was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating product topic with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ProductTopic.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product topic was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete product topic with id=${id}. Maybe it was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete product topic with id=${id}.`, 500);
    });
};
