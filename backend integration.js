const express = require('express');
const bodyParser = require('body-parser');
const { savePlayerPick } = require('./db'); // Import your database function

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to save player pick
app.post('/api/savePlayerPick', async (req, res) => {
    const playerPickData = req.body;
    try {
        const savedPlayerPick = await savePlayerPick(playerPickData); // Implement this function to save to MongoDB/MySQL
        res.status(201).json(savedPlayerPick);
    } catch (error) {
        console.error('Error saving player pick:', error.message);
        res.status(500).json({ error: 'Failed to save player pick' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
