const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import student routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Student Management App is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
