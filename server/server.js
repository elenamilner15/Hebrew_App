// server\server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const verbRoutes = require('./routes/verbRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 5500;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.use('/auth', authRoutes); // authentication routes under /auth
app.use('/verbs', verbRoutes); // verb routes under /verbs
app.use('/profile', profileRoutes); // profile routes under /profile
app.use('/user', userRoutes); // profile routes under /profile



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
