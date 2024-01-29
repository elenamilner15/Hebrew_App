// server\routes\profileRoutes.js

const express = require("express")
const router = express.Router()
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');



// Define a GET route to fetch user profile by username
router.get('/:username', authController.getUserProfile);

module.exports = router;

