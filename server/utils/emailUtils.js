// server\utils\emailUtils.js

const nodemailer = require('nodemailer');

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'starthebrew@gmail.com', // Your Gmail email address
        pass: 'vgag yydd bhla gbmk', // Your Gmail email password
    },
});



// Function to send a password reset email
async function sendPasswordResetEmail(email, resetToken) {
    //new-password?
    const resetLink = `http://localhost:3000/new-password?token=${resetToken}`;

    // Nodemailer message options
    const mailOptions = {
        from: 'starthebrew@gmail.com', // Sender email address
        to: email, // Receiver email address
        subject: 'Password Reset', // Email subject
        text: `Click the following link to reset your password: ${resetLink}`, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Sending password reset email to ${email}. Reset link: ${resetLink}`);
}

module.exports = { sendPasswordResetEmail };