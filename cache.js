let cachedPlayerData = null;

async function fetchPlayerData() {
  if (cachedPlayerData) {
    return cachedPlayerData;
  }
  
  const url = 'http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2023&week=1&format=json';
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch player data');
    }
    const data = await response.json();
    if (!data || !data.players) {
      throw new Error('Invalid data format from API');
    }
    cachedPlayerData = data.players.map(player => ({
      id: player.id,
      name: player.displayName,
      position: player.position,
      seasonPts: player.seasonPts
    }));
    return cachedPlayerData;
  } catch (error) {
    console.error('Error fetching or processing player data:', error.message);
    return []; // Handle errors and return appropriate fallback
  }
}
