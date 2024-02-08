//server\controllers\authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../database/connection')
const crypto = require('crypto'); // Restore password
const { sendPasswordResetEmail } = require('../utils/emailUtils');



const secretKey = 'test';

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        console.log('Registering a new user...');
        const { username, email, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the default role
        const newUser = await User.createUser({
            username,
            email,
            password: hashedPassword,
            role: 'student', // Default role
        });

        // Generate a JWT token for the new user
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, secretKey);

        // Set the JWT token as an HTTP cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        console.log('Logging in a user...');
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

        // Set the JWT token as an HTTP cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Logout a user (clear the JWT token)
exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

// Controller function to fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        // Query the database to get all users
        const users = await db.any('SELECT * FROM users');

        // Send the list of users as a JSON response
        res.status(200).json(users);
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
};


//_________________________________
//server\controllers\authController.js
// Controller function to get user profile
exports.getUserProfile = async (req, res) => {
    try {
        console.log('Profile...');
        const { username } = req.params;

        // Find the user by username
        const profile = await User.getUserProfile(username);

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
};


// Function to generate a random token

const generateRandomToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Controller function to restore password
exports.restorePassword = async (req, res) => {
    try {
        console.log('Restore Password');
        const { email } = req.body;
        console.log(email);


        // Find the user by email
        const user = await User.findUserByEmail(email);

        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ message: 'Email not found. Please check your email address' });
        }


        // Generate a unique token for password restore
        const resetToken = generateRandomToken();
        console.log('Generated Reset Token:', resetToken);

        // Set the expiration time (e.g., 1 hour from now)
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        // Update user data with the reset token and expiration time using the User model function
        await User.updateUserResetToken(email, resetToken, expirationTime);
        console.log('Updated user data with reset token and expiration time');
        console.log(email, expirationTime);
        // Send an email with the password reset link
        await sendPasswordResetEmail(email, resetToken);
        console.log("!!!");


        return res.status(200).json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        console.error('Error during password reset:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

//server\controllers\authController.js
// Controller function to set the new password
exports.newPassword = async (req, res, dispatchCallback) => {
    console.log('authController')
    try {
        const { username, passwordInput, resetToken } = req.body;

        // Find the user by the reset token
        const user = await User.findUserByResetToken(resetToken);
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'Invalid reset token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(passwordInput, 10);
        console.log('Updating user password and clearing reset token');




        // Update user's password and clear the reset token
        await User.updateUserPassword(user.email, hashedPassword);
        // await User.clearUserResetToken(user.email);//??????????????



        // Set the JWT token as an HTTP cookie
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey);

        res.cookie('token', token, { httpOnly: true });
        console.log('Password set successfully');
        res.status(200).json({
            message: 'Password set successfully',
            user: {
                id: user.id,
                username: user.username,
            },
        });


    } catch (error) {
        console.error('Error setting new password:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};






