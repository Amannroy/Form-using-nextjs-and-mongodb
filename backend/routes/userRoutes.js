const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// POST route to handle user creation
router.route('/users').post(userController.createUser)

// GET route to fetch all users
router.route('/users').get(userController.getAllUsers);

module.exports = router