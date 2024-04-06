const {
  addProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const router = require('express').Router();

router.post('/add', auth, addProduct);
router.get('/all', auth, getAllProducts);
router.get('/:id', auth, getProductById);

module.exports = router;
