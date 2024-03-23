const {register, login, getProfile} = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
// authorized routes
router.get('/me', auth, getProfile);

module.exports = router;
