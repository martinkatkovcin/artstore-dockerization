const db = require('../../models/index.js');
const ProductMaterial = db.product_materials;

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

  const productMaterial = {
    name: req.body.name,
  };

  ProductMaterial.create(productMaterial).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the product material.', 500);
    });
};

exports.findAll = (req, res) => {
  ProductMaterial.findAll().then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving product materials.', 500);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ProductMaterial.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find product material with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving product material with id=${id}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ProductMaterial.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product material was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update product material with id=${id}. Maybe it was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating product material with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ProductMaterial.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product material was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete product material with id=${id}. Maybe it was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete product material with id=${id}.`, 500);
    });
};
