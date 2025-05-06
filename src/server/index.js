const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const searchRoute = require('./routes/search');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/search', searchRoute);

// Default route to serve the frontend (for single-page apps)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Log all registered routes
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`Route: ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(`Route: ${handler.route.path}`);
            }
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
