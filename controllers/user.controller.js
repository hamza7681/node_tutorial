const {StatusCodes} = require('http-status-codes');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const EmailSender = require('../utils/sendEmail');
const secret = process.env.ACCESS_TOKEN_SECRET;

const userCtrl = {
  register: async (req, res) => {
    try {
      const {name, email, password} = req.body;
      if (!name || !email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({msg: 'Missing fields'});
      }
      const findUser = await User.findOne({email: email});
      if (findUser) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({msg: 'User already registered'});
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      return res
        .status(StatusCodes.CREATED)
        .json({msg: 'User registered', user: newUser});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      const findUser = await User.findOne({email});
      if (findUser) {
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (isMatch) {
          const token = jwt.sign({id: findUser._id}, secret);
          return res
            .status(StatusCodes.OK)
            .json({msg: 'Login Successfully', access_token: token});
        }
      }
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({msg: 'Invalid Credentials'});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
  getProfile: async (req, res) => {
    try {
      const id = req.user;
      const findUser = await User.findById(id);
      return res.status(StatusCodes.OK).json(findUser);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const {email} = req.body;
      const findUser = await User.findOne({email});
      if (findUser) {
        const token = jwt.sign({id: findUser._id}, secret);
        const url = 'http://localhost:3000/reset/' + token;
        await EmailSender({
          email,
          subject: 'Reset Password',
          heading: 'Reset Password',
          text: 'Click on below url to reset your password',
          spanText: 'Reset',
          url,
        });
        return res
          .status(StatusCodes.OK)
          .json({msg: 'Email has been sent successfully'});
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({msg: 'No User found!'});
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
  resetPassword: async (req, res) => {
    try {
      const {password} = req.body;
      const id = req.user;
      const hashPassword = await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate(id, {password: hashPassword});
      return res
        .status(StatusCodes.OK)
        .json({msg: 'Password reset successfully'});
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error});
    }
  },
};

module.exports = userCtrl;
