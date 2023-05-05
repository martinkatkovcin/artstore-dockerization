const db = require('../../models/index.js');
const Product = db.products;
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

  const path = req.file ? req.file.path : null;

  const product = {
    title: req.body.title,
    description: req.body.description,
    image_path: path,
    price: req.body.price,
    product_period_id: req.body.product_period_id,
    product_topic_id: req.body.product_topic_id,
    product_material_id: req.body.product_material_id,
  };

  Product.create(product).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while creating the product.', 500);
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { username: { [Op.like]: `%${title}%` } } : null;

  Product.findAll({ where: condition }).then(data => {
      res.send(data);
    }).catch(err => {
      sendMessage(res, err.message || 'Some error occurred while retrieving products.', 500);
    });
};

exports.findAllSorted = (req, res) => {
  const title = req.query.title;
  const condition = title ? { username: { [Op.like]: `%${title}%` } } : null;

  Product.findAll({
    where: condition,
    order: [['id', 'DESC']]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    sendMessage(res, err.message || 'Some error occurred while retrieving products.', 500);
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id).then(data => {
      if (data) {
        res.send(data);
      } else {
        sendMessage(res, `Cannot find product with id=${id}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving product with id=${id}`, 500);
    });
};

exports.getImage = (req, res) => {
  const path = req.params.path;

  Product.findOne({ where: { image_path: { [Op.like]: `%${path}%` } } }).then(data => {
      if (data) {
        res.type('image/jpeg').download(data.image_path);
      } else {
        sendMessage(res, `Cannot find image with path=${path}`, 404);
      }
    }).catch(() => {
      sendMessage(res, `Error retrieving image with path=${path}`, 500);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product was updated successfully.', null);
      } else {
        sendMessage(res, `Cannot update product with id=${id}. Maybe product was not found or req.body is empty.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Error updating product with id=${id}`, 500);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        sendMessage(res, 'Product was deleted successfully.', null);
      } else {
        sendMessage(res, `Cannot delete product with id=${id}. Maybe product was not found.`, null);
      }
    }).catch(() => {
      sendMessage(res, `Could not delete product with id=${id}.`, 500);
    });
};
