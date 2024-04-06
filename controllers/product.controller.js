const Product = require('../models/product.model');
const {StatusCodes} = require('http-status-codes');

const productCtrl = {
  addProduct: async (req, res) => {
    try {
      const {productName, price} = req.body;
      const id = req.user;
      const newProduct = new Product({productName, price, userId: id});
      await newProduct.save();
      return res
        .status(StatusCodes.CREATED)
        .json({msg: 'Product added successfully', body: newProduct});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().populate('userId', 'name email');
      return res
        .status(StatusCodes.CREATED)
        .json({msg: 'Product added successfully', body: products});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
  getProductById: async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findById(id).populate(
        'userId',
        'name email'
      );
      return res
        .status(StatusCodes.CREATED)
        .json({msg: 'Product added successfully', body: product});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
};

module.exports = productCtrl;
