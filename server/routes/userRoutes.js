// server\routes\userRoutes.js

const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController');

// const authMiddleware = require('../middleware/authMiddleware');



// Define a GET route to fetch user profile by username
router.get('/user_id', userController.getUserprogress);
router.post('/update', userController.updateUserProgress);
// router.get('/progress', userController.getProgressForLevel);
router.get('/progress/:user_id/:level/:tense', userController.getProgressForLevel);

module.exports = router;

