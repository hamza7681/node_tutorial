const secret = process.env.ACCESS_TOKEN_SECRET;
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const auth = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid Token'});
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'Invalid Token'});
    }
    req.user = user.id;
    next();
  });
};

module.exports = auth;
