const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 

// Define the User model with Sequelize
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Validates password according to requirements
function isValidPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

module.exports = {
    User,
    isValidPassword  
};

