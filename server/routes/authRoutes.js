//server\routes\authRoutes.js
const express = require("express")
const router = express.Router()
const authController = require('../controllers/authController');


// Register a new user
router.post('/register', authController.registerUser);

// Log in a user
router.post('/login', authController.loginUser);

// Log out a user (clear the authentication state)
router.post('/logout', authController.logoutUser);

// GET route to fetch all users
router.get('/users', authController.getAllUsers);

// restore-password
router.post('/password', authController.restorePassword);
// new-password
router.post('/new-password', authController.newPassword);


router.use((req, res, next) => {
    console.log(`Accessed route: ${req.method} ${req.url}`);
    next();
});

module.exports = router;