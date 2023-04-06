const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');

/* Auth */

router.post('/login', authController.login);

/* Users */
router.post('/users', usersController.create);


module.exports = router;