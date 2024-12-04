const sequelize = require('./models/index'); // Import mocked Sequelize instance

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Synchronize the mocked database
});

afterAll(async () => {
    await sequelize.close(); // Close the database connection after tests
});