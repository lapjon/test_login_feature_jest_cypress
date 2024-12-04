const { User } = require('./user');


// Function to save a user to the database 
async function saveNewUser(userData) {
    return await User.create(userData);
}

// Function to get user from database by username
async function getUser(username) {
    return await User.findOne({ where: { username } });
}

// Function to log in user by verifying credentials
async function loginUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.password !== password) {
        throw new Error('Incorrect password');
    }
    return { message: 'Logged in successfully!' };
}

module.exports = {
    saveNewUser,
    getUser, 
    loginUser
};