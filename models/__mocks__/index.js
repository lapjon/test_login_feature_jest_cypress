const { Sequelize } = require('sequelize');

// Initialize a Sequelize instance for mocking, using an in-memory SQLite database
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Export the mocked instance
module.exports = sequelize;