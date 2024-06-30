const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PlayerPick = require('./models/PlayerPick');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (change the connection string as needed)
mongoose.connect('mongodb://localhost:27017/fantasyFootball', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/savePlayerPick', async (req, res) => {
    const playerPickData = req.body;
    try {
        const savedPlayerPick = await PlayerPick.create(playerPickData);
        res.status(201).json(savedPlayerPick);
    } catch (error) {
        console.error('Error saving player pick:', error.message);
        res.status(500).json({ error: 'Failed to save player pick' });
    }
});

app.get('/api/getPlayerPicks', async (req, res) => {
    try {
        const playerPicks = await PlayerPick.find().sort({ createdAt: -1 });
        res.status(200).json(playerPicks);
    } catch (error) {
        console.error('Error fetching player picks:', error.message);
        res.status(500).json({ error: 'Failed to fetch player picks' });
    }
});

// Serve static files (for frontend)
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
