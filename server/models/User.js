//server\models\User.js
const db = require('../database/connection');

// Function to create a new user
const createUser = async ({ username, email, password, role }) => {
    try {
        const newUser = await db.oneOrNone(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, password, role]
        );
        return newUser;
    } catch (error) {
        throw error;
    }
};

// Function to find a user by username
const findUserByUsername = async (username) => {
    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
        return user;
    } catch (error) {
        throw error;
    }
};

//models/User.js
// Function to get UserProfile
const getUserProfile = async (username) => {
    try {
        const profile = await db.oneOrNone(
            `
            SELECT
              id,
              email,
              score          
            FROM users
            WHERE username = $1
            `,
            [username]
        );
        return profile;
    } catch (error) {
        throw error;
    }
};

// Function to find a user by email
const findUserByEmail = async (email) => {
    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        return user;
    } catch (error) {
        throw error;
    }
};

// Function to update user data with reset token and expiration time
const updateUserResetToken = async (email, resetToken, expirationTime) => {
    try {
        await db.none(
            'UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3',
            [resetToken, expirationTime, email]
        );
    } catch (error) {
        throw error;
    }
};


const findUserByResetToken = async (resetToken) => {
    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE reset_token = $1', [resetToken]);
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUserPassword = async (email, hashedPassword) => {
    try {
        await db.none('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
    } catch (error) {
        throw error;
    }
};

const clearUserResetToken = async (email) => {
    try {
        await db.none('UPDATE users SET reset_token = null, reset_token_expiration = null WHERE email = $1', [email]);
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createUser,
    findUserByUsername,
    getUserProfile,
    findUserByEmail,
    updateUserResetToken,
    findUserByResetToken,
    updateUserPassword,
    clearUserResetToken,
};
