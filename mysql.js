const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'fantasyFootball'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Example function to save a player pick
function savePlayerPick(playerPickData) {
  const { playerId, playerName, position, draftRound, team } = playerPickData;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `INSERT INTO player_picks (playerId, playerName, position, draftRound, team, timestamp) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [playerId, playerName, position, draftRound, team, timestamp];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error saving player pick:', error.message);
      throw error;
    }
    console.log('Player pick saved:', results);
  });
}

module.exports = {
  savePlayerPick
};
