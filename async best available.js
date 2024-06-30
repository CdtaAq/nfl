async function pickBestAvailablePlayer(position, playersData) {
  // Filter players by position
  let playersByPosition = playersData.filter(player => player.position === position);
  
  // Sort players by season points (highest to lowest)
  playersByPosition.sort((a, b) => b.seasonPts - a.seasonPts);
  
  // Return the top player for the specified position
  return playersByPosition.length > 0 ? playersByPosition[0] : null;
}

// Example usage:
async function makeDraftPick() {
  let playersData = await fetchPlayerData();
  
  // Example: Pick the best QB available
  let bestQB = await pickBestAvailablePlayer("QB", playersData);
  console.log("Best QB:", bestQB);
  
  // Example: Pick the best RB available
  let bestRB = await pickBestAvailablePlayer("RB", playersData);
  console.log("Best RB:", bestRB);
  
  // Example: Pick the best WR available
  let bestWR = await pickBestAvailablePlayer("WR", playersData);
  console.log("Best WR:", bestWR);
  
  // Example: Pick the best TE available
  let bestTE = await pickBestAvailablePlayer("TE", playersData);
  console.log("Best TE:", bestTE);
}

makeDraftPick();
