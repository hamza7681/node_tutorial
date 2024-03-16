const {StatusCodes} = require('http-status-codes');
const User = require('../models/user.model');

const userCtrl = {
  register: async (req, res) => {
    try {
      const {name, email, password} = req.body;
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      return res
        .status(StatusCodes.CREATED)
        .json({msg: 'User registered', user: newUser});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
};

module.exports = userCtrl;
