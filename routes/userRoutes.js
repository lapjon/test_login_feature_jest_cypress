const express = require('express');
const { User, isValidPassword } = require('../models/user');
const router = express.Router();

// Register a new user 
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Checks for empty fields
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        // Validates password
        if (!isValidPassword(password)) {
            throw new Error("Your password must be at least 8 characters long, contain an uppercase letter, and a number!");
        }

        //Checks if username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            throw new Error("Hmm, it seems that username is already taken. Please choose another one!");
        }

        // Create a new user in the database
        const newUser = await User.create({ username, password });
        res.status(201).json({ message: 'Your user was created successfully!', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Log in a user 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const user = await User.findOne({ where: { username } });
        if (!user) throw new Error('User not found');
        if (user.password !== password) throw new Error('Incorrect password');

        res.status(200).json({ message: 'Logged in successfully!'});
    }   catch (error) {
        console.error(`Login error: ${error.message}`);
        res.status(401).json({ error: error.message });
    }
});

// Change Password
router.post('/change-password', async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('User not found.');
        }

        // Check if the current password is correct
        if (user.password !== currentPassword) {
            throw new Error('Current password is incorrect!');
        }

        // Validate the new password
        if (!isValidPassword(newPassword)) {
            throw new Error('New password must be at least 8 characters long, contain an uppercase letter, and a number.');
        }

        // Update the password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;