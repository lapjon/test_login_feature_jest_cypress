const express = require('express');
const path = require('path');
const sequelize = require('./models/index'); 
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Use the user routes
app.use('/api/users', userRoutes);

// Serve frontend HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signup.html'));
});

app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dashboard.html'));
});

// Synchronize the database and start the server
sequelize
    .sync()
    .then(() => {
        console.log('Database synchronized');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

