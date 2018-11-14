const express = require('express');
const checkToken = require('../../src/app/check-token')
const router = express.Router();

let home_controller = require('../controllers/homeController');

//get logs
router.get('/logs', home_controller.getLog);

//get invoices of current user
router.get('/', home_controller.user_invoices);

//Post request for registering a user
router.post('/register', home_controller.user_register);

//Put request for updating  a user password
router.put('/update-password', home_controller.update_user_password);

//Put request for updating a user
router.put('/update-user', home_controller.update_user);

//Delete request for deleting a user
router.delete('/delete-user/:id', home_controller.delete_user);

//Get request for verifying user tokens
router.get('/token', checkToken, home_controller.user_token);

//Post request for signing users in
router.post('/login', home_controller.user_login);

// Get request for logging users out
router.get('/logout', home_controller.user_logout);

// Load home page with  user invoices
router.get('/home/:username', home_controller.user_invoices);

//get all user invoices
router.get('/home-invoices/', home_controller.get_all_invoices);

//get all security questions available
router.get('/security-questions', home_controller.all_questions);

// get all services available
router.get('/repair-services', home_controller.all_services);

// Save invoice 
router.post('/save-invoice', home_controller.save_invoice);

// Get all services available
router.get( '/home-services', home_controller.all_services);

// Get user by name for password reset
router.get('/reset/:username', home_controller.get_user_by_name);

// Get all users
router.get('/get-all-users', home_controller.get_all_users);

module.exports = router;
