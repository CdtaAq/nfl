async function fetchPlayerData() {
  const url = 'http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2023&week=1&format=json';
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.players.map(player => ({
      id: player.id,
      name: player.displayName,
      position: player.position,
      seasonPts: player.seasonPts
    }));
  } catch (error) {
    console.error('Error fetching player data:', error);
    return []; // Return an empty array if there's an error
  }
}
