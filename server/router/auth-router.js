const express = require('express');
const router = express.Router();
const auth_controllers = require('../controllers/auth-controllers');
const validate = require('../middlewares/validate-middleware');

router.route('/').get(auth_controllers.home);
router.route('/register').post(validate, auth_controllers.register);
router.route('/login').post(auth_controllers.login);

module.exports = router;