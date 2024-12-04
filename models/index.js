const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite (database file will be 'database.sqlite')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // This file will store the SQLite database
});

// Export the instance for use in other models and files
module.exports = sequelize;