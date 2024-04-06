const {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
} = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgotPassword);
// authorized routes
router.get('/me', auth, getProfile);
router.patch('/reset', auth, resetPassword);

module.exports = router;
