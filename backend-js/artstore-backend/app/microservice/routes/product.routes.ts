const products = require('../controllers/product.controller.ts');
const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); // set the extension to ".jpg"
  }
});

const upload = multer({ storage: storage });

module.exports = app => {
  router.post('/', upload.single('image'), products.create);

  router.get('/', products.findAll);

  router.get('/sorted', products.findAllSorted);

  router.get('/:id', products.findOne);

  router.get('/image/:path', products.getImage);

  router.put('/:id', products.update);

  router.delete('/:id', products.delete);

  app.use('/api/products', router);
};
