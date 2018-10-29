const express = require('express');
const checkToken = require('../../src/app/check-token')
const router = express.Router();

let home_controller = require('../controllers/homeController');

router.get('/', home_controller.index);

//Post request for registering a user
router.post('/register', home_controller.user_register);

//Get request for verifying user tokens
router.get('/token', checkToken, home_controller.user_token);

//Post request for signing users in
router.post('/login', home_controller.user_login);

// Get request for logging users out
router.get('/logout', home_controller.user_logout);


module.exports = router;
